import fs from 'fs/promises';
import path from 'path';
import CacheAdapter from './cache-adapter.js';

/**
 * File-based cache adapter
 */
class FileCacheAdapter extends CacheAdapter {
  /**
   * Create a new file cache adapter
   * @param {Object} [options={}] - Cache options
   * @param {string} [options.directory='./cache'] - Cache directory
   * @param {number} [options.defaultTTL=3600] - Default TTL in seconds (1 hour)
   */
  constructor(options = {}) {
    super();
    this.directory = options.directory || './cache';
    this.defaultTTL = options.defaultTTL || 3600;
    this.initialized = false;
  }

  /**
   * Initialize the cache directory
   * @returns {Promise<void>}
   * @private
   */
  async _initialize() {
    if (this.initialized) return;
    
    try {
      await fs.mkdir(this.directory, { recursive: true });
      this.initialized = true;
    } catch (error) {
      throw new Error(`Failed to create cache directory: ${error.message}`);
    }
  }

  /**
   * Get the file path for a cache key
   * @param {string} key - The cache key
   * @returns {string} The file path
   * @private
   */
  _getFilePath(key) {
    // Create a safe filename from the key
    const safeKey = Buffer.from(key).toString('base64').replace(/[/+=]/g, '_');
    return path.join(this.directory, `${safeKey}.json`);
  }

  /**
   * Get a value from the cache
   * @param {string} key - The cache key
   * @returns {Promise<any|null>} The cached value or null if not found
   */
  async get(key) {
    await this._initialize();
    
    const filePath = this._getFilePath(key);
    
    try {
      const data = await fs.readFile(filePath, 'utf8');
      const cacheEntry = JSON.parse(data);
      
      // Check if the entry has expired
      if (cacheEntry.expiresAt && cacheEntry.expiresAt < Date.now()) {
        await this.delete(key);
        return null;
      }
      
      return cacheEntry.value;
    } catch (error) {
      // If the file doesn't exist or can't be read, return null
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
    await this._initialize();
    
    const filePath = this._getFilePath(key);
    const cacheEntry = {
      value,
      createdAt: Date.now(),
      expiresAt: ttl > 0 ? Date.now() + (ttl * 1000) : null
    };
    
    try {
      await fs.writeFile(filePath, JSON.stringify(cacheEntry), 'utf8');
    } catch (error) {
      throw new Error(`Failed to write to cache: ${error.message}`);
    }
  }

  /**
   * Check if a key exists in the cache
   * @param {string} key - The cache key
   * @returns {Promise<boolean>} True if the key exists and is not expired, false otherwise
   */
  async has(key) {
    const value = await this.get(key);
    return value !== null;
  }

  /**
   * Delete a key from the cache
   * @param {string} key - The cache key
   * @returns {Promise<boolean>} True if the key was deleted, false otherwise
   */
  async delete(key) {
    await this._initialize();
    
    const filePath = this._getFilePath(key);
    
    try {
      await fs.unlink(filePath);
      return true;
    } catch (error) {
      // If the file doesn't exist, that's fine
      return false;
    }
  }

  /**
   * Clear all keys from the cache
   * @returns {Promise<void>}
   */
  async clear() {
    await this._initialize();
    
    try {
      const files = await fs.readdir(this.directory);
      
      await Promise.all(
        files
          .filter(file => file.endsWith('.json'))
          .map(file => fs.unlink(path.join(this.directory, file)))
      );
    } catch (error) {
      throw new Error(`Failed to clear cache: ${error.message}`);
    }
  }
}

export default FileCacheAdapter;
