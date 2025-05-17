declare module '@elselab/node-tmdb-sdk' {
    export interface CacheOptions {
        /**
         * Enable caching
         * @default true
         */
        enableCache?: boolean;
        
        /**
         * Cache TTL in seconds
         * @default 3600
         */
        cacheTTL?: number;
        
        /**
         * Cache adapter instance
         */
        cache?: CacheAdapter;
    }
    
    export interface RequestOptions {
        /**
         * Override cache setting for this request
         */
        useCache?: boolean;
        
        /**
         * Override cache TTL for this request
         */
        cacheTTL?: number;
    }
    
    export class CacheAdapter {
        /**
         * Get a value from the cache
         * @param key - The cache key
         */
        get(key: string): Promise<any | null>;
        
        /**
         * Set a value in the cache
         * @param key - The cache key
         * @param value - The value to cache
         * @param ttl - Time to live in seconds
         */
        set(key: string, value: any, ttl?: number): Promise<void>;
        
        /**
         * Check if a key exists in the cache
         * @param key - The cache key
         */
        has(key: string): Promise<boolean>;
        
        /**
         * Delete a key from the cache
         * @param key - The cache key
         */
        delete(key: string): Promise<boolean>;
        
        /**
         * Clear all keys from the cache
         */
        clear(): Promise<void>;
        
        /**
         * Generate a cache key from an endpoint and parameters
         * @param endpoint - The API endpoint
         * @param params - The query parameters
         */
        generateKey(endpoint: string, params?: Record<string, any>): string;
    }
    
    export interface FileCacheOptions {
        /**
         * Cache directory
         * @default './cache'
         */
        directory?: string;
        
        /**
         * Default TTL in seconds
         * @default 3600
         */
        defaultTTL?: number;
    }
    
    export class FileCacheAdapter extends CacheAdapter {
        constructor(options?: FileCacheOptions);
    }
    
    export interface RedisCacheOptions {
        /**
         * Prefix for cache keys
         * @default 'tmdb:'
         */
        keyPrefix?: string;
        
        /**
         * Default TTL in seconds
         * @default 3600
         */
        defaultTTL?: number;
    }
    
    export class RedisCacheAdapter extends CacheAdapter {
        constructor(redisClient: any, options?: RedisCacheOptions);
    }
    
    export class TMDB {
        /**
         * Initialize the TMDB SDK
         * @param apiKey - Your TMDB API key
         * @param options - SDK options
         */
        constructor(apiKey: string, options?: CacheOptions);
        
        movie: MovieEndpoint;
        discover: DiscoverEndpoint;
        keyword: KeywordEndpoint;
        search: SearchEndpoint;
    }
    
    export class MovieEndpoint {
        getDetails(movieId: string | number, options?: Record<string, any>): Promise<any>;
        getAccountStates(movieId: string | number): Promise<any>;
        getAlternativeTitles(movieId: string | number): Promise<any>;
        getChanges(movieId: string | number, options?: Record<string, any>): Promise<any>;
        getCredits(movieId: string | number, options?: Record<string, any>): Promise<any>;
        getExternalIds(movieId: string | number): Promise<any>;
        getImages(movieId: string | number): Promise<any>;
        getKeywords(movieId: string | number): Promise<any>;
        getLatest(): Promise<any>;
        getLists(movieId: string | number, options?: Record<string, any>): Promise<any>;
        getRecommendations(movieId: string | number, options?: Record<string, any>): Promise<any>;
        getReleaseDates(movieId: string | number): Promise<any>;
        getReviews(movieId: string | number, options?: Record<string, any>): Promise<any>;
        getSimilar(movieId: string | number, options?: Record<string, any>): Promise<any>;
        getTranslations(movieId: string | number): Promise<any>;
        getVideos(movieId: string | number, options?: Record<string, any>): Promise<any>;
        getWatchProviders(movieId: string | number): Promise<any>;
        rateMovie(movieId: string | number, rating: number): Promise<any>;
        deleteRating(movieId: string | number): Promise<any>;
    }
    
    export class DiscoverEndpoint {
        getMovies(options?: Record<string, any>): Promise<any>;
        getTvShows(options?: Record<string, any>): Promise<any>;
    }
    
    export class KeywordEndpoint {
        getDetails(keywordId: string | number): Promise<any>;
        getMovies(keywordId: string | number, options?: Record<string, any>): Promise<any>;
    }
    
    export class SearchEndpoint {
        getCompanies(query: string, options?: Record<string, any>): Promise<any>;
        getCollections(query: string, options?: Record<string, any>): Promise<any>;
        getKeywords(query: string, options?: Record<string, any>): Promise<any>;
        getMovies(query: string, options?: Record<string, any>): Promise<any>;
        getMulti(query: string, options?: Record<string, any>): Promise<any>;
        getPeople(query: string, options?: Record<string, any>): Promise<any>;
        getTvShows(query: string, options?: Record<string, any>): Promise<any>;
    }
    
    export default TMDB;
}
