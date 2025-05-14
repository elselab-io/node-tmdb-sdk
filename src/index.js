import TMDBClient from './client.js';
import MovieEndpoint from './endpoints/movie.js';
import DiscoverEndpoint from './endpoints/discover.js';
import KeywordEndpoint from './endpoints/keyword.js';
import SearchEndpoint from './endpoints/search.js';

class TMDB {
  /**
   * Initialize the TMDB SDK
   * @param {string} apiKey - Your TMDB API key
   */
  constructor(apiKey) {
    this.client = new TMDBClient(apiKey);
    
    // Initialize endpoints
    this.movie = new MovieEndpoint(this.client);
    this.discover = new DiscoverEndpoint(this.client);
    this.keyword = new KeywordEndpoint(this.client);
    this.search = new SearchEndpoint(this.client);
  }
}

export default TMDB; 