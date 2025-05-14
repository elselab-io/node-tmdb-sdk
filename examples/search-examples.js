import TMDB from '../src/index.js';

// Initialize the SDK with your API key
const tmdb = new TMDB('your-api-key');

// Example 1: Search for movies
async function searchMovies() {
  try {
    const movies = await tmdb.search.searchMovies('Inception', {
      language: 'en-US',
      region: 'US',
      year: '2010'
    });

    console.log('Movie Search Results:', movies.results.slice(0, 3).map(movie => ({
      title: movie.title,
      release_date: movie.release_date,
      overview: movie.overview.substring(0, 100) + '...'
    })));
  } catch (error) {
    console.error('Error searching movies:', error.message);
  }
}

// Example 2: Multi-search (movies, TV shows, people)
async function searchMulti() {
  try {
    const results = await tmdb.search.searchMulti('Brad Pitt', {
      language: 'en-US'
    });

    console.log('Multi-Search Results:', results.results.slice(0, 5).map(result => ({
      id: result.id,
      name: result.title || result.name,
      media_type: result.media_type,
      // For people, include known_for
      ...(result.media_type === 'person' && {
        known_for: result.known_for?.map(work => work.title || work.name)
      })
    })));
  } catch (error) {
    console.error('Error performing multi-search:', error.message);
  }
}

// Example 3: Search for TV shows
async function searchTVShows() {
  try {
    const shows = await tmdb.search.searchTVShows('Breaking Bad', {
      language: 'en-US',
      first_air_date_year: '2008'
    });

    console.log('TV Show Search Results:', shows.results.slice(0, 3).map(show => ({
      name: show.name,
      first_air_date: show.first_air_date,
      overview: show.overview.substring(0, 100) + '...'
    })));
  } catch (error) {
    console.error('Error searching TV shows:', error.message);
  }
}

// Example 4: Search for people
async function searchPeople() {
  try {
    const people = await tmdb.search.searchPeople('Leonardo DiCaprio');

    console.log('People Search Results:', people.results.slice(0, 3).map(person => ({
      name: person.name,
      known_for_department: person.known_for_department,
      known_for: person.known_for?.map(work => work.title || work.name)
    })));
  } catch (error) {
    console.error('Error searching people:', error.message);
  }
}

// Example 5: Search for collections and companies
async function searchCollectionsAndCompanies() {
  try {
    // Search for movie collections
    const collections = await tmdb.search.searchCollections('Harry Potter');
    console.log('Collection Search Results:', collections.results.slice(0, 2).map(collection => ({
      name: collection.name,
      overview: collection.overview?.substring(0, 100) + '...'
    })));

    // Search for companies
    const companies = await tmdb.search.searchCompanies('Marvel');
    console.log('\nCompany Search Results:', companies.results.slice(0, 2).map(company => ({
      name: company.name,
      origin_country: company.origin_country
    })));
  } catch (error) {
    console.error('Error searching collections and companies:', error.message);
  }
}

// Run the examples
console.log('Running TMDB Search Examples...\n');

const runExamples = async () => {
  await searchMovies();
  console.log('\n---\n');
  
  await searchMulti();
  console.log('\n---\n');
  
  await searchTVShows();
  console.log('\n---\n');
  
  await searchPeople();
  console.log('\n---\n');
  
  await searchCollectionsAndCompanies();
};

runExamples().catch(console.error); 