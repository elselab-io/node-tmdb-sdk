import TMDB, { FileCacheAdapter, RedisCacheAdapter } from '../src/index.js';
// If you're using this example outside the project, use:
// import TMDB, { FileCacheAdapter, RedisCacheAdapter } from '@elselab/node-tmdb-sdk';

// Example 1: Using File Cache
async function fileBasedCacheExample() {
  console.log('Example 1: Using File Cache');
  
  // Create a file cache adapter with custom options
  const fileCache = new FileCacheAdapter({
    directory: './tmdb-cache', // Cache directory
    defaultTTL: 7200 // 2 hours
  });
  
  // Initialize TMDB with the file cache
  const tmdb = new TMDB('', {
    cache: fileCache,
    enableCache: true, // Enable caching (default is true)
    cacheTTL: 3600 // Default TTL is 1 hour
  });
  
  console.log('First request (not cached):');
  console.time('First request');
  const movie = await tmdb.movie.getDetails('550', { language: 'en-US' });
  console.timeEnd('First request');
  console.log(`Movie: ${movie.title}`);
  
  console.log('\nSecond request (should be cached):');
  console.time('Second request');
  const cachedMovie = await tmdb.movie.getDetails('550', { language: 'en-US' });
  console.timeEnd('Second request');
  console.log(`Movie: ${cachedMovie.title}`);
  
  // Disable cache for a specific request
  console.log('\nThird request (cache disabled):');
  console.time('Third request');
  const freshMovie = await tmdb.movie.getDetails('550', { language: 'en-US' }, { useCache: false });
  console.timeEnd('Third request');
  console.log(`Movie: ${freshMovie.title}`);
}

// Example 2: Using Redis Cache (requires Redis)
async function redisBasedCacheExample() {
  console.log('\nExample 2: Using Redis Cache');
  
  // You would need to install and import Redis
  // import { createClient } from 'redis';
  
  try {
    // Create Redis client
    // const redisClient = createClient();
    // await redisClient.connect();
    
    // For this example, we'll just log what would happen
    console.log('Would create Redis client and connect');
    
    // Create a Redis cache adapter
    // const redisCache = new RedisCacheAdapter(redisClient, {
    //   keyPrefix: 'tmdb:api:',
    //   defaultTTL: 7200 // 2 hours
    // });
    
    console.log('Would create Redis cache adapter with prefix "tmdb:api:"');
    
    // Initialize TMDB with the Redis cache
    // const tmdb = new TMDB('your-api-key', {
    //   cache: redisCache
    // });
    
    console.log('Would initialize TMDB with Redis cache');
    
    // Example requests would be similar to the file cache example
    console.log('Would make API requests that get cached in Redis');
    
    // Close Redis connection when done
    // await redisClient.quit();
  } catch (error) {
    console.error('Redis example error:', error.message);
  }
}

// Example 3: Disabling cache
function disabledCacheExample() {
  console.log('\nExample 3: Disabled Cache');
  
  // Initialize TMDB with caching disabled
  const tmdb = new TMDB('your-api-key', {
    enableCache: false
  });
  
  console.log('Created TMDB client with caching disabled');
  console.log('All requests will go directly to the API without caching');
}

// Run the examples
async function runExamples() {
  try {
    await fileBasedCacheExample();
    await redisBasedCacheExample();
    disabledCacheExample();
  } catch (error) {
    console.error('Error running examples:', error);
  }
}

runExamples();
