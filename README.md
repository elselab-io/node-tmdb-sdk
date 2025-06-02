# @elselab-io/node-tmdb-sdk

[![npm version](https://badge.fury.io/js/@elselab-io/node-tmdb-sdk.svg)](https://badge.fury.io/js/@elselab-io/node-tmdb-sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Tests](https://img.shields.io/badge/tests-passing-brightgreen.svg)](./test/)

A lightweight JavaScript SDK for The Movie Database (TMDB) REST API. This SDK provides a simple and intuitive way to interact with TMDB's API endpoints.

## 🚀 Installation

```bash
npm install @elselab-io/node-tmdb-sdk
```

## ⚡ Quick Start

```javascript
import TMDB from '@elselab-io/node-tmdb-sdk';

// Initialize the SDK with your API key
const tmdb = new TMDB('your-api-key');

// Get movie details
const movie = await tmdb.movie.getDetails('550'); // Fight Club
console.log(movie.title); // "Fight Club"
```

## ✨ Features

- **📱 Modern JavaScript (ESM)** - Built with modern ES modules
- **🔄 Promise-based API** - Clean async/await support throughout
- **🎯 Clean and intuitive interface** - Simple and easy to use
- **🛠️ Built with Axios** - Reliable HTTP communication
- **🛡️ Comprehensive error handling** - Robust error management
- **💾 Flexible caching system** - Support for file-based and Redis caching

## 📖 Examples

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

## 💾 Caching

The SDK includes a flexible caching system to improve performance and reduce API calls. You can use either file-based caching or Redis caching.

### 📁 File-based Caching

```javascript
import TMDB, { FileCacheAdapter } from '@elselab-io/node-tmdb-sdk';

// Create a file cache adapter
const fileCache = new FileCacheAdapter({
  directory: './tmdb-cache', // Cache directory (default: './cache')
  defaultTTL: 3600 // Cache TTL in seconds (default: 1 hour)
});

// Initialize TMDB with the file cache
const tmdb = new TMDB('your-api-key', {
  cache: fileCache,
  enableCache: true, // Enable caching (default: true)
  cacheTTL: 3600 // Default TTL in seconds (default: 1 hour)
});

// Use the SDK as usual - responses will be cached automatically
const movie = await tmdb.movie.getDetails('550');
```

### 🔴 Redis Caching

```javascript
import TMDB, { RedisCacheAdapter } from '@elselab-io/node-tmdb-sdk';
import { createClient } from 'redis'; // You need to install redis package

// Create Redis client
const redisClient = createClient();
await redisClient.connect();

// Create a Redis cache adapter
const redisCache = new RedisCacheAdapter(redisClient, {
  keyPrefix: 'tmdb:', // Prefix for cache keys (default: 'tmdb:')
  defaultTTL: 3600 // Default TTL in seconds (default: 1 hour)
});

// Initialize TMDB with the Redis cache
const tmdb = new TMDB('your-api-key', {
  cache: redisCache
});

// Use the SDK as usual - responses will be cached in Redis
const movie = await tmdb.movie.getDetails('550');
```

### 🚫 Disabling Cache for Specific Requests

You can disable caching for specific requests by passing an options object as the third parameter:

```javascript
// This request will bypass the cache
const freshMovie = await tmdb.movie.getDetails('550', { language: 'en-US' }, { 
  useCache: false 
});
```

See the `examples/cache-examples.js` file for more detailed examples of using the caching system.

## 🔑 API Key

To use this SDK, you'll need a TMDB API key. You can obtain one by:

1. Creating an account on [TMDB](https://www.themoviedb.org/)
2. Going to your [API settings](https://www.themoviedb.org/settings/api)
3. Following the steps to generate an API key

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

<div align="center">
  <a href="https://elselab.io">
    <img src="https://elselab.io/wp-content/uploads/2024/04/Elselab-Logo.png" alt="Else Lab" width="200">
  </a>
  
  **Made with ❤️ by [Else Lab](https://github.com/elselab-io)**
  
  [Website](https://elselab.io) • [GitHub](https://github.com/elselab-io) • [Contact](mailto:contact@elselab.io)
</div>
