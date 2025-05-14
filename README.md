# @elselabdev/node-tmdb-sdk

A lightweight JavaScript SDK for The Movie Database (TMDB) REST API. This SDK provides a simple and intuitive way to interact with TMDB's API endpoints.

## Installation

```bash
npm install @elselabdev/node-tmdb-sdk
```

## Quick Start

```javascript
import TMDB from '@elselabdev/node-tmdb-sdk';

// Initialize the SDK with your API key
const tmdb = new TMDB('your-api-key');

// Get movie details
const movie = await tmdb.movie.getDetails('550'); // Fight Club
console.log(movie.title); // "Fight Club"
```

## Features

- Modern JavaScript (ESM)
- Promise-based API
- Clean and intuitive interface
- Built with Axios for reliable HTTP communication
- Comprehensive error handling

## Examples

Check out the `examples` directory for more detailed usage examples. Here's a quick example showing how to get movie details with additional data:

```javascript
const movieDetails = await tmdb.movie.getDetails('238', {
  language: 'en-US',
  append_to_response: 'videos,credits'
});

console.log({
  title: movieDetails.title,
  director: movieDetails.credits.crew.find(person => person.job === 'Director')?.name,
  cast: movieDetails.credits.cast.slice(0, 5).map(actor => actor.name)
});
```

## API Key

To use this SDK, you'll need a TMDB API key. You can obtain one by:

1. Creating an account on [TMDB](https://www.themoviedb.org/)
2. Going to your [API settings](https://www.themoviedb.org/settings/api)
3. Following the steps to generate an API key

## License

MIT 