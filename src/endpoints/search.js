class SearchEndpoint {
  constructor(client) {
    this.client = client;
  }

  /**
   * Search for collections
   * @param {string} query - Search query
   * @param {Object} [options] - Additional query parameters
   * @param {string} [options.language='en-US'] - ISO 639-1 language code
   * @param {boolean} [options.include_adult=false] - Include adult content
   * @param {number} [options.page=1] - Page number of results
   * @param {string} [options.region] - ISO 3166-1 region code
   * @returns {Promise<Object>} Search results
   */
  async searchCollections(query, options = {}) {
    if (!query) {
      throw new Error('Search query is required');
    }

    const defaultOptions = {
      query,
      language: 'en-US',
      include_adult: false,
      page: 1
    };

    return this.client.get('/search/collection', { ...defaultOptions, ...options });
  }

  /**
   * Search for companies
   * @param {string} query - Search query
   * @param {Object} [options] - Additional query parameters
   * @param {number} [options.page=1] - Page number of results
   * @returns {Promise<Object>} Search results
   */
  async searchCompanies(query, options = {}) {
    if (!query) {
      throw new Error('Search query is required');
    }

    const defaultOptions = {
      query,
      page: 1
    };

    return this.client.get('/search/company', { ...defaultOptions, ...options });
  }

  /**
   * Search for keywords
   * @param {string} query - Search query
   * @param {Object} [options] - Additional query parameters
   * @param {number} [options.page=1] - Page number of results
   * @returns {Promise<Object>} Search results
   */
  async searchKeywords(query, options = {}) {
    if (!query) {
      throw new Error('Search query is required');
    }

    const defaultOptions = {
      query,
      page: 1
    };

    return this.client.get('/search/keyword', { ...defaultOptions, ...options });
  }

  /**
   * Search for movies
   * @param {string} query - Search query
   * @param {Object} [options] - Additional query parameters
   * @param {string} [options.language='en-US'] - ISO 639-1 language code
   * @param {boolean} [options.include_adult=false] - Include adult content
   * @param {number} [options.page=1] - Page number of results
   * @param {string} [options.region] - ISO 3166-1 region code
   * @param {string} [options.year] - Filter results to a specific year
   * @param {string} [options.primary_release_year] - Filter by primary release year
   * @returns {Promise<Object>} Search results
   */
  async searchMovies(query, options = {}) {
    if (!query) {
      throw new Error('Search query is required');
    }

    const defaultOptions = {
      query,
      language: 'en-US',
      include_adult: false,
      page: 1
    };

    return this.client.get('/search/movie', { ...defaultOptions, ...options });
  }

  /**
   * Search multiple models in a single request (movie, tv, person)
   * @param {string} query - Search query
   * @param {Object} [options] - Additional query parameters
   * @param {string} [options.language='en-US'] - ISO 639-1 language code
   * @param {boolean} [options.include_adult=false] - Include adult content
   * @param {number} [options.page=1] - Page number of results
   * @returns {Promise<Object>} Search results
   */
  async searchMulti(query, options = {}) {
    if (!query) {
      throw new Error('Search query is required');
    }

    const defaultOptions = {
      query,
      language: 'en-US',
      include_adult: false,
      page: 1
    };

    return this.client.get('/search/multi', { ...defaultOptions, ...options });
  }

  /**
   * Search for people
   * @param {string} query - Search query
   * @param {Object} [options] - Additional query parameters
   * @param {string} [options.language='en-US'] - ISO 639-1 language code
   * @param {boolean} [options.include_adult=false] - Include adult content
   * @param {number} [options.page=1] - Page number of results
   * @returns {Promise<Object>} Search results
   */
  async searchPeople(query, options = {}) {
    if (!query) {
      throw new Error('Search query is required');
    }

    const defaultOptions = {
      query,
      language: 'en-US',
      include_adult: false,
      page: 1
    };

    return this.client.get('/search/person', { ...defaultOptions, ...options });
  }

  /**
   * Search for TV shows
   * @param {string} query - Search query
   * @param {Object} [options] - Additional query parameters
   * @param {string} [options.language='en-US'] - ISO 639-1 language code
   * @param {boolean} [options.include_adult=false] - Include adult content
   * @param {number} [options.page=1] - Page number of results
   * @param {string} [options.first_air_date_year] - Filter by first air date year
   * @returns {Promise<Object>} Search results
   */
  async searchTVShows(query, options = {}) {
    if (!query) {
      throw new Error('Search query is required');
    }

    const defaultOptions = {
      query,
      language: 'en-US',
      include_adult: false,
      page: 1
    };

    return this.client.get('/search/tv', { ...defaultOptions, ...options });
  }
}

export default SearchEndpoint; 