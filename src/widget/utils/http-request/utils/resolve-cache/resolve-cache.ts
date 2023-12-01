import { cache } from '../cache';

export const resolveCache = (url: string, data: any) => {
  cache[url].onLoad.forEach(callback => callback(data));

  // Update the cache
  cache[url].data = data;
  cache[url].loading = false;
};
