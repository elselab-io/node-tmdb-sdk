import TMDBClient from './client.js';
import MovieEndpoint from './endpoints/movie.js';
import DiscoverEndpoint from './endpoints/discover.js';
import KeywordEndpoint from './endpoints/keyword.js';
import SearchEndpoint from './endpoints/search.js';
import { CacheAdapter, FileCacheAdapter, RedisCacheAdapter } from './cache/index.js';

class TMDB {
  /**
   * Initialize the TMDB SDK
   * @param {string} apiKey - Your TMDB API key
   * @param {Object} [options={}] - SDK options
   * @param {Object} [options.cache] - Cache adapter instance
   * @param {boolean} [options.enableCache=true] - Enable caching
   * @param {number} [options.cacheTTL=3600] - Cache TTL in seconds (default: 1 hour)
   */
  constructor(apiKey, options = {}) {
    this.client = new TMDBClient(apiKey, options);
    
    // Initialize endpoints
    this.movie = new MovieEndpoint(this.client);
    this.discover = new DiscoverEndpoint(this.client);
    this.keyword = new KeywordEndpoint(this.client);
    this.search = new SearchEndpoint(this.client);
  }
}

export { 
  TMDB,
  CacheAdapter,
  FileCacheAdapter,
  RedisCacheAdapter
};
export default TMDB;
