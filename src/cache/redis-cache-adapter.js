import CacheAdapter from './cache-adapter.js';

/**
 * Redis-based cache adapter
 */
class RedisCacheAdapter extends CacheAdapter {
  /**
   * Create a new Redis cache adapter
   * @param {Object} redisClient - Redis client instance
   * @param {Object} [options={}] - Cache options
   * @param {string} [options.keyPrefix='tmdb:'] - Prefix for cache keys
   * @param {number} [options.defaultTTL=3600] - Default TTL in seconds (1 hour)
   */
  constructor(redisClient, options = {}) {
    super();
    
    if (!redisClient) {
      throw new Error('Redis client is required');
    }
    
    this.redis = redisClient;
    this.keyPrefix = options.keyPrefix || 'tmdb:';
    this.defaultTTL = options.defaultTTL || 3600;
  }

  /**
   * Get the prefixed key
   * @param {string} key - The cache key
   * @returns {string} The prefixed key
   * @private
   */
  _getPrefixedKey(key) {
    return `${this.keyPrefix}${key}`;
  }

  /**
   * Get a value from the cache
   * @param {string} key - The cache key
   * @returns {Promise<any|null>} The cached value or null if not found
   */
  async get(key) {
    const prefixedKey = this._getPrefixedKey(key);
    
    try {
      const data = await this.redis.get(prefixedKey);
      
      if (!data) {
        return null;
      }
      
      return JSON.parse(data);
    } catch (error) {
      console.error(`Redis cache error: ${error.message}`);
      return null;
    }
  }

  /**
   * Set a value in the cache
   * @param {string} key - The cache key
   * @param {any} value - The value to cache
   * @param {number} [ttl] - Time to live in seconds
   * @returns {Promise<void>}
   */
  async set(key, value, ttl = this.defaultTTL) {
    const prefixedKey = this._getPrefixedKey(key);
    const serializedValue = JSON.stringify(value);
    
    try {
      if (ttl > 0) {
        await this.redis.set(prefixedKey, serializedValue, 'EX', ttl);
      } else {
        await this.redis.set(prefixedKey, serializedValue);
      }
    } catch (error) {
      console.error(`Redis cache error: ${error.message}`);
    }
  }

  /**
   * Check if a key exists in the cache
   * @param {string} key - The cache key
   * @returns {Promise<boolean>} True if the key exists, false otherwise
   */
  async has(key) {
    const prefixedKey = this._getPrefixedKey(key);
    
    try {
      const exists = await this.redis.exists(prefixedKey);
      return exists === 1;
    } catch (error) {
      console.error(`Redis cache error: ${error.message}`);
      return false;
    }
  }

  /**
   * Delete a key from the cache
   * @param {string} key - The cache key
   * @returns {Promise<boolean>} True if the key was deleted, false otherwise
   */
  async delete(key) {
    const prefixedKey = this._getPrefixedKey(key);
    
    try {
      const result = await this.redis.del(prefixedKey);
      return result === 1;
    } catch (error) {
      console.error(`Redis cache error: ${error.message}`);
      return false;
    }
  }

  /**
   * Clear all keys from the cache with the configured prefix
   * @returns {Promise<void>}
   */
  async clear() {
    try {
      const keys = await this.redis.keys(`${this.keyPrefix}*`);
      
      if (keys.length > 0) {
        await this.redis.del(keys);
      }
    } catch (error) {
      console.error(`Redis cache error: ${error.message}`);
    }
  }
}

export default RedisCacheAdapter;
