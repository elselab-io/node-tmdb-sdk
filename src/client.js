import axios from 'axios';

class TMDBClient {
  /**
   * Create a new TMDB client
   * @param {string} apiKey - TMDB API key
   * @param {Object} [options={}] - Client options
   * @param {Object} [options.cache] - Cache adapter instance
   * @param {boolean} [options.enableCache=true] - Enable caching
   * @param {number} [options.cacheTTL=3600] - Cache TTL in seconds (default: 1 hour)
   */
  constructor(apiKey, options = {}) {
    if (!apiKey) {
      throw new Error('TMDB API key is required');
    }

    this.client = axios.create({
      baseURL: 'https://api.themoviedb.org/3',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    // Cache configuration
    this.cache = options.cache || null;
    this.enableCache = options.enableCache !== undefined ? options.enableCache : true;
    this.cacheTTL = options.cacheTTL || 3600;
  }

  /**
   * Make a GET request to the TMDB API
   * @param {string} endpoint - API endpoint
   * @param {Object} [params={}] - Query parameters
   * @param {Object} [options={}] - Request options
   * @param {boolean} [options.useCache] - Override cache setting for this request
   * @param {number} [options.cacheTTL] - Override cache TTL for this request
   * @returns {Promise<Object>} Response data
   */
  async get(endpoint, params = {}, options = {}) {
    const useCache = options.useCache !== undefined ? options.useCache : this.enableCache;
    const cacheTTL = options.cacheTTL || this.cacheTTL;
    
    // Check if we should use cache and if a cache adapter is available
    if (useCache && this.cache) {
      const cacheKey = this.cache.generateKey(endpoint, params);
      
      // Try to get from cache first
      const cachedData = await this.cache.get(cacheKey);
      if (cachedData) {
        return cachedData;
      }
      
      // If not in cache, make the request and cache the result
      try {
        const response = await this.client.get(endpoint, { params });
        const data = response.data;
        
        // Cache the response
        await this.cache.set(cacheKey, data, cacheTTL);
        
        return data;
      } catch (error) {
        throw this._handleError(error);
      }
    } else {
      // No cache, just make the request
      try {
        const response = await this.client.get(endpoint, { params });
        return response.data;
      } catch (error) {
        throw this._handleError(error);
      }
    }
  }

  async post(endpoint, data = {}) {
    try {
      const response = await this.client.post(endpoint, data);
      return response.data;
    } catch (error) {
      throw this._handleError(error);
    }
  }

  async delete(endpoint) {
    try {
      const response = await this.client.delete(endpoint);
      return response.data;
    } catch (error) {
      throw this._handleError(error);
    }
  }

  _handleError(error) {
    if (error.response) {
      const { status, data } = error.response;
      return new Error(`TMDB API Error ${status}: ${data.status_message || 'Unknown error'}`);
    }
    return error;
  }
}

export default TMDBClient;
