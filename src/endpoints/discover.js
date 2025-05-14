class DiscoverEndpoint {
  constructor(client) {
    this.client = client;
  }

  /**
   * Discover movies based on various criteria
   * @param {Object} [options] - Query parameters for discovering movies
   * @param {string} [options.language='en-US'] - ISO 639-1 language code
   * @param {number} [options.page=1] - Page number of results
   * @param {string} [options.sort_by='popularity.desc'] - Sort key and order
   * @param {boolean} [options.include_adult=false] - Include adult content
   * @param {boolean} [options.include_video=false] - Include videos
   * @param {string} [options.primary_release_year] - Filter by primary release year
   * @param {string} [options.primary_release_date.gte] - Filter by minimum release date
   * @param {string} [options.primary_release_date.lte] - Filter by maximum release date
   * @param {string} [options.with_genres] - Filter by genre IDs (comma-separated)
   * @param {string} [options.with_cast] - Filter by cast IDs (comma-separated)
   * @param {string} [options.with_crew] - Filter by crew IDs (comma-separated)
   * @param {string} [options.with_companies] - Filter by company IDs (comma-separated)
   * @param {string} [options.with_watch_providers] - Filter by watch provider IDs (comma-separated)
   * @param {string} [options.watch_region] - ISO 3166-1 region code for watch providers
   * @param {number} [options.vote_average.gte] - Filter by minimum vote average
   * @param {number} [options.vote_count.gte] - Filter by minimum vote count
   * @returns {Promise<Object>} Discovered movies
   */
  async discoverMovies(options = {}) {
    const defaultOptions = {
      language: 'en-US',
      page: 1,
      sort_by: 'popularity.desc',
      include_adult: false,
      include_video: false
    };

    return this.client.get('/discover/movie', { ...defaultOptions, ...options });
  }

  /**
   * Discover TV shows based on various criteria
   * @param {Object} [options] - Query parameters for discovering TV shows
   * @param {string} [options.language='en-US'] - ISO 639-1 language code
   * @param {number} [options.page=1] - Page number of results
   * @param {string} [options.sort_by='popularity.desc'] - Sort key and order
   * @param {boolean} [options.include_adult=false] - Include adult content
   * @param {boolean} [options.include_null_first_air_dates=false] - Include shows with no air date
   * @param {string} [options.air_date.gte] - Filter by minimum air date
   * @param {string} [options.air_date.lte] - Filter by maximum air date
   * @param {string} [options.first_air_date_year] - Filter by first air date year
   * @param {string} [options.with_genres] - Filter by genre IDs (comma-separated)
   * @param {string} [options.with_networks] - Filter by network IDs (comma-separated)
   * @param {string} [options.with_companies] - Filter by company IDs (comma-separated)
   * @param {string} [options.with_watch_providers] - Filter by watch provider IDs (comma-separated)
   * @param {string} [options.watch_region] - ISO 3166-1 region code for watch providers
   * @param {number} [options.vote_average.gte] - Filter by minimum vote average
   * @param {number} [options.vote_count.gte] - Filter by minimum vote count
   * @returns {Promise<Object>} Discovered TV shows
   */
  async discoverTVShows(options = {}) {
    const defaultOptions = {
      language: 'en-US',
      page: 1,
      sort_by: 'popularity.desc',
      include_adult: false,
      include_null_first_air_dates: false
    };

    return this.client.get('/discover/tv', { ...defaultOptions, ...options });
  }
}

export default DiscoverEndpoint; 