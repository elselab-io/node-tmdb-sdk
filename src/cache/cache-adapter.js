/**
 * Abstract class for cache adapters
 * All cache adapters must implement these methods
 */
class CacheAdapter {
  /**
   * Get a value from the cache
   * @param {string} key - The cache key
   * @returns {Promise<any|null>} The cached value or null if not found
   */
  async get(key) {
    throw new Error('Method not implemented');
  }

  /**
   * Set a value in the cache
   * @param {string} key - The cache key
   * @param {any} value - The value to cache
   * @param {number} [ttl=3600] - Time to live in seconds (default: 1 hour)
   * @returns {Promise<void>}
   */
  async set(key, value, ttl = 3600) {
    throw new Error('Method not implemented');
  }

  /**
   * Check if a key exists in the cache
   * @param {string} key - The cache key
   * @returns {Promise<boolean>} True if the key exists, false otherwise
   */
  async has(key) {
    throw new Error('Method not implemented');
  }

  /**
   * Delete a key from the cache
   * @param {string} key - The cache key
   * @returns {Promise<boolean>} True if the key was deleted, false otherwise
   */
  async delete(key) {
    throw new Error('Method not implemented');
  }

  /**
   * Clear all keys from the cache
   * @returns {Promise<void>}
   */
  async clear() {
    throw new Error('Method not implemented');
  }

  /**
   * Generate a cache key from an endpoint and parameters
   * @param {string} endpoint - The API endpoint
   * @param {Object} [params={}] - The query parameters
   * @returns {string} The generated cache key
   */
  generateKey(endpoint, params = {}) {
    const sortedParams = Object.keys(params)
      .sort()
      .reduce((result, key) => {
        result[key] = params[key];
        return result;
      }, {});
    
    return `${endpoint}:${JSON.stringify(sortedParams)}`;
  }
}

export default CacheAdapter;
