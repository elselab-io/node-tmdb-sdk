import TMDB from '../src/index.js';

// Initialize the SDK with your API key
const tmdb = new TMDB('your-api-key');

// Example 1: Get keyword details
async function getKeywordDetails() {
  try {
    // "superhero" keyword (ID: 9715)
    const keyword = await tmdb.keyword.getDetails('9715');
    console.log('Keyword Details:', keyword);
  } catch (error) {
    console.error('Error fetching keyword details:', error.message);
  }
}

// Example 2: Get movies for a keyword
async function getKeywordMovies() {
  try {
    // Get movies tagged with "superhero" (ID: 9715)
    const movies = await tmdb.keyword.getMovies('9715', {
      language: 'en-US',
      include_adult: false
    });

    console.log('Movies with Superhero keyword:', movies.results.slice(0, 5).map(movie => ({
      title: movie.title,
      release_date: movie.release_date,
      overview: movie.overview.substring(0, 100) + '...'
    })));
  } catch (error) {
    console.error('Error fetching keyword movies:', error.message);
  }
}

// Run the examples
console.log('Running TMDB Keyword Examples...\n');

const runExamples = async () => {
  await getKeywordDetails();
  console.log('\n---\n');
  
  await getKeywordMovies();
};

runExamples().catch(console.error); 