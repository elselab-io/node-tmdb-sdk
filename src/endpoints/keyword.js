class KeywordEndpoint {
  constructor(client) {
    this.client = client;
  }

  /**
   * Get details of a keyword by ID
   * @param {number|string} keywordId - The ID of the keyword
   * @returns {Promise<Object>} Keyword details
   */
  async getDetails(keywordId) {
    if (!keywordId) {
      throw new Error('Keyword ID is required');
    }
    return this.client.get(`/keyword/${keywordId}`);
  }

  /**
   * Get movies that have been tagged with a specific keyword
   * @param {number|string} keywordId - The ID of the keyword
   * @param {Object} [options] - Additional query parameters
   * @param {string} [options.language='en-US'] - ISO 639-1 language code
   * @param {boolean} [options.include_adult=false] - Include adult content
   * @param {number} [options.page=1] - Page number of results
   * @returns {Promise<Object>} List of movies
   */
  async getMovies(keywordId, options = {}) {
    if (!keywordId) {
      throw new Error('Keyword ID is required');
    }

    const defaultOptions = {
      language: 'en-US',
      include_adult: false,
      page: 1
    };

    return this.client.get(`/keyword/${keywordId}/movies`, { ...defaultOptions, ...options });
  }
}

export default KeywordEndpoint; 