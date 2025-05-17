import TMDB from '../src/index.js';

// Initialize the SDK with your API key
const tmdb = new TMDB('');

// Example 1: Discover popular movies
async function discoverPopularMovies() {
  try {
    const movies = await tmdb.discover.discoverMovies({
      sort_by: 'popularity.desc',
      page: 1,
      vote_average: { gte: 7.0 },
      vote_count: { gte: 1000 }
    });

    console.log('Popular Movies:', movies.results.slice(0, 5).map(movie => ({
      title: movie.title,
      popularity: movie.popularity,
      vote_average: movie.vote_average,
      release_date: movie.release_date
    })));
  } catch (error) {
    console.error('Error discovering popular movies:', error.message);
  }
}

// Example 2: Discover movies by genre and year
async function discoverMoviesByGenreAndYear() {
  try {
    // Action movies (genre_id: 28) from 2023
    const movies = await tmdb.discover.discoverMovies({
      with_genres: '28',
      primary_release_year: '2023',
      sort_by: 'vote_average.desc',
      vote_count: { gte: 100 }
    });

    console.log('Action Movies from 2023:', movies.results.slice(0, 5).map(movie => ({
      title: movie.title,
      vote_average: movie.vote_average,
      release_date: movie.release_date
    })));
  } catch (error) {
    console.error('Error discovering movies by genre and year:', error.message);
  }
}

// Example 3: Discover popular TV shows
async function discoverPopularTVShows() {
  try {
    const shows = await tmdb.discover.discoverTVShows({
      sort_by: 'popularity.desc',
      vote_average: { gte: 8.0 },
      vote_count: { gte: 500 }
    });

    console.log('Popular TV Shows:', shows.results.slice(0, 5).map(show => ({
      name: show.name,
      popularity: show.popularity,
      vote_average: show.vote_average,
      first_air_date: show.first_air_date
    })));
  } catch (error) {
    console.error('Error discovering popular TV shows:', error.message);
  }
}

// Example 4: Discover TV shows by network and year
async function discoverTVShowsByNetworkAndYear() {
  try {
    // Netflix shows (network_id: 213) from 2024
    const shows = await tmdb.discover.discoverTVShows({
      with_networks: '213',
      first_air_date_year: '2024',
      sort_by: 'vote_average.desc',
      vote_count: { gte: 50 }
    });

    console.log('Netflix Shows from 2024:', shows.results.slice(0, 5).map(show => ({
      name: show.name,
      vote_average: show.vote_average,
      first_air_date: show.first_air_date
    })));
  } catch (error) {
    console.error('Error discovering TV shows by network and year:', error.message);
  }
}

// Run the examples
console.log('Running TMDB Discover Examples...\n');

const runExamples = async () => {
  await discoverPopularMovies();
  console.log('\n---\n');
  
  await discoverMoviesByGenreAndYear();
  console.log('\n---\n');
  
  await discoverPopularTVShows();
  console.log('\n---\n');
  
  await discoverTVShowsByNetworkAndYear();
};

runExamples().catch(console.error); 