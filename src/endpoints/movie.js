class MovieEndpoint {
  constructor(client) {
    this.client = client;
  }

  /**
   * Get details of a movie by ID
   * @param {number|string} movieId - The ID of the movie
   * @param {Object} [options] - Additional query parameters
   * @param {string} [options.language] - Language for the movie data (e.g., 'en-US')
   * @param {string} [options.append_to_response] - Additional data to append to the response
   * @returns {Promise<Object>} Movie details
   */
  async getDetails(movieId, options = {}) {
    if (!movieId) {
      throw new Error('Movie ID is required');
    }

    return this.client.get(`/movie/${movieId}`, options);
  }

  /**
   * Get account states for a movie (rating, watchlist, favorite)
   * @param {number|string} movieId - The ID of the movie
   * @returns {Promise<Object>} Account states for the movie
   */
  async getAccountStates(movieId) {
    if (!movieId) {
      throw new Error('Movie ID is required');
    }
    return this.client.get(`/movie/${movieId}/account_states`);
  }

  /**
   * Get alternative titles for a movie
   * @param {number|string} movieId - The ID of the movie
   * @returns {Promise<Object>} Alternative titles
   */
  async getAlternativeTitles(movieId) {
    if (!movieId) {
      throw new Error('Movie ID is required');
    }
    return this.client.get(`/movie/${movieId}/alternative_titles`);
  }

  /**
   * Get changes for a movie
   * @param {number|string} movieId - The ID of the movie
   * @param {Object} [options] - Additional query parameters
   * @param {number} [options.page] - Page number of results
   * @returns {Promise<Object>} Movie changes
   */
  async getChanges(movieId, options = {}) {
    if (!movieId) {
      throw new Error('Movie ID is required');
    }
    return this.client.get(`/movie/${movieId}/changes`, options);
  }

  /**
   * Get credits for a movie
   * @param {number|string} movieId - The ID of the movie
   * @param {Object} [options] - Additional query parameters
   * @param {string} [options.language] - Language for the credits data
   * @returns {Promise<Object>} Movie credits
   */
  async getCredits(movieId, options = {}) {
    if (!movieId) {
      throw new Error('Movie ID is required');
    }
    return this.client.get(`/movie/${movieId}/credits`, options);
  }

  /**
   * Get external IDs for a movie
   * @param {number|string} movieId - The ID of the movie
   * @returns {Promise<Object>} External IDs
   */
  async getExternalIds(movieId) {
    if (!movieId) {
      throw new Error('Movie ID is required');
    }
    return this.client.get(`/movie/${movieId}/external_ids`);
  }

  /**
   * Get images for a movie
   * @param {number|string} movieId - The ID of the movie
   * @returns {Promise<Object>} Movie images
   */
  async getImages(movieId) {
    if (!movieId) {
      throw new Error('Movie ID is required');
    }
    return this.client.get(`/movie/${movieId}/images`);
  }

  /**
   * Get keywords for a movie
   * @param {number|string} movieId - The ID of the movie
   * @returns {Promise<Object>} Movie keywords
   */
  async getKeywords(movieId) {
    if (!movieId) {
      throw new Error('Movie ID is required');
    }
    return this.client.get(`/movie/${movieId}/keywords`);
  }

  /**
   * Get the latest movie added to TMDB
   * @returns {Promise<Object>} Latest movie details
   */
  async getLatest() {
    return this.client.get('/movie/latest');
  }

  /**
   * Get lists that contain a movie
   * @param {number|string} movieId - The ID of the movie
   * @param {Object} [options] - Additional query parameters
   * @param {string} [options.language] - Language for the lists data
   * @param {number} [options.page] - Page number of results
   * @returns {Promise<Object>} Lists containing the movie
   */
  async getLists(movieId, options = {}) {
    if (!movieId) {
      throw new Error('Movie ID is required');
    }
    return this.client.get(`/movie/${movieId}/lists`, options);
  }

  /**
   * Get movie recommendations
   * @param {number|string} movieId - The ID of the movie
   * @param {Object} [options] - Additional query parameters
   * @param {string} [options.language] - Language for the recommendations
   * @param {number} [options.page] - Page number of results
   * @returns {Promise<Object>} Movie recommendations
   */
  async getRecommendations(movieId, options = {}) {
    if (!movieId) {
      throw new Error('Movie ID is required');
    }
    return this.client.get(`/movie/${movieId}/recommendations`, options);
  }

  /**
   * Get release dates for a movie
   * @param {number|string} movieId - The ID of the movie
   * @returns {Promise<Object>} Release dates
   */
  async getReleaseDates(movieId) {
    if (!movieId) {
      throw new Error('Movie ID is required');
    }
    return this.client.get(`/movie/${movieId}/release_dates`);
  }

  /**
   * Get reviews for a movie
   * @param {number|string} movieId - The ID of the movie
   * @param {Object} [options] - Additional query parameters
   * @param {string} [options.language] - Language for the reviews
   * @param {number} [options.page] - Page number of results
   * @returns {Promise<Object>} Movie reviews
   */
  async getReviews(movieId, options = {}) {
    if (!movieId) {
      throw new Error('Movie ID is required');
    }
    return this.client.get(`/movie/${movieId}/reviews`, options);
  }

  /**
   * Get similar movies
   * @param {number|string} movieId - The ID of the movie
   * @param {Object} [options] - Additional query parameters
   * @param {string} [options.language] - Language for the similar movies
   * @param {number} [options.page] - Page number of results
   * @returns {Promise<Object>} Similar movies
   */
  async getSimilar(movieId, options = {}) {
    if (!movieId) {
      throw new Error('Movie ID is required');
    }
    return this.client.get(`/movie/${movieId}/similar`, options);
  }

  /**
   * Get translations for a movie
   * @param {number|string} movieId - The ID of the movie
   * @returns {Promise<Object>} Movie translations
   */
  async getTranslations(movieId) {
    if (!movieId) {
      throw new Error('Movie ID is required');
    }
    return this.client.get(`/movie/${movieId}/translations`);
  }

  /**
   * Get videos for a movie
   * @param {number|string} movieId - The ID of the movie
   * @param {Object} [options] - Additional query parameters
   * @param {string} [options.language] - Language for the videos
   * @returns {Promise<Object>} Movie videos
   */
  async getVideos(movieId, options = {}) {
    if (!movieId) {
      throw new Error('Movie ID is required');
    }
    return this.client.get(`/movie/${movieId}/videos`, options);
  }

  /**
   * Get watch providers for a movie
   * @param {number|string} movieId - The ID of the movie
   * @returns {Promise<Object>} Watch providers
   */
  async getWatchProviders(movieId) {
    if (!movieId) {
      throw new Error('Movie ID is required');
    }
    return this.client.get(`/movie/${movieId}/watch/providers`);
  }

  /**
   * Rate a movie
   * @param {number|string} movieId - The ID of the movie
   * @param {number} rating - Rating value between 0.5 and 10.0
   * @returns {Promise<Object>} Rating response
   */
  async rateMovie(movieId, rating) {
    if (!movieId) {
      throw new Error('Movie ID is required');
    }
    if (rating < 0.5 || rating > 10) {
      throw new Error('Rating must be between 0.5 and 10.0');
    }
    return this.client.post(`/movie/${movieId}/rating`, { value: rating });
  }

  /**
   * Delete your rating for a movie
   * @param {number|string} movieId - The ID of the movie
   * @returns {Promise<Object>} Delete rating response
   */
  async deleteRating(movieId) {
    if (!movieId) {
      throw new Error('Movie ID is required');
    }
    return this.client.delete(`/movie/${movieId}/rating`);
  }
}

export default MovieEndpoint; 