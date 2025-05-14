import TMDB from '../src/index.js';

// Initialize the SDK with your API key
// You can get an API key from https://www.themoviedb.org/settings/api
const tmdb = new TMDB('eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDJiMjlmOGI2MmVhNDM3YjZhYjZlOWNjOWNkMjU4MSIsIm5iZiI6MTcxNjg5NjQ5MC4xNDQsInN1YiI6IjY2NTVjMmVhOGY3NmI3ZjBjMTM2MGQ3ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zyYDm6Ky32lbVnmgSKl4ebRYb9MQ2eroNo1GZmeoO3c');

// Example 1: Get basic movie details
async function getBasicMovieDetails() {
  try {
    // Fight Club (1999) - ID: 550
    const movie = await tmdb.movie.getDetails('550');
    console.log('Basic movie details:', {
      title: movie.title,
      releaseDate: movie.release_date,
      overview: movie.overview,
      rating: movie.vote_average
    });
  } catch (error) {
    console.error('Error fetching basic movie details:', error.message);
  }
}

// Example 2: Get comprehensive movie information
async function getComprehensiveMovieInfo() {
  try {
    // The Godfather (1972) - ID: 238
    const [movie, credits, videos, providers] = await Promise.all([
      tmdb.movie.getDetails('238', {
        language: 'en-US'
      }),
      tmdb.movie.getCredits('238'),
      tmdb.movie.getVideos('238'),
      tmdb.movie.getWatchProviders('238')
    ]);

    console.log('Comprehensive movie information:', {
      title: movie.title,
      director: credits.crew.find(person => person.job === 'Director')?.name,
      cast: credits.cast.slice(0, 5).map(actor => actor.name), // Top 5 cast members
      trailers: videos.results.filter(video => video.type === 'Trailer'),
      watchProviders: providers.results
    });
  } catch (error) {
    console.error('Error fetching comprehensive movie info:', error.message);
  }
}

// Example 3: Get movie recommendations and similar movies
async function getMovieSuggestions() {
  try {
    // Inception (2010) - ID: 27205
    const [recommendations, similar] = await Promise.all([
      tmdb.movie.getRecommendations('27205', { language: 'en-US' }),
      tmdb.movie.getSimilar('27205', { language: 'en-US' })
    ]);

    console.log('Movie suggestions:', {
      recommendations: recommendations.results.slice(0, 5).map(movie => ({
        title: movie.title,
        rating: movie.vote_average
      })),
      similarMovies: similar.results.slice(0, 5).map(movie => ({
        title: movie.title,
        rating: movie.vote_average
      }))
    });
  } catch (error) {
    console.error('Error fetching movie suggestions:', error.message);
  }
}

// Example 4: Rate a movie and get account states
async function rateAndCheckMovie() {
  try {
    // Rate Inception (2010)
    await tmdb.movie.rateMovie('27205', 9.0);
    
    // Get account states (including your rating)
    const accountStates = await tmdb.movie.getAccountStates('27205');
    console.log('Movie account states:', accountStates);

    // Delete your rating
    await tmdb.movie.deleteRating('27205');
    console.log('Rating deleted successfully');
  } catch (error) {
    console.error('Error with movie rating:', error.message);
  }
}

// Run the examples
console.log('Running TMDB SDK Examples...\n');

const runExamples = async () => {
  await getBasicMovieDetails();
  console.log('\n---\n');
  
  await getComprehensiveMovieInfo();
  console.log('\n---\n');
  
  await getMovieSuggestions();
  console.log('\n---\n');
  
  await rateAndCheckMovie();
};

runExamples().catch(console.error); 