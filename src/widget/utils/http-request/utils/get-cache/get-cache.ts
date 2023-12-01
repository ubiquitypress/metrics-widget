import { cache } from '../cache';

export const getCache = (url: string) => {
  // Data is in the cache, but is still loading
  if (cache[url].loading) {
    return new Promise(resolve => {
      cache[url].onLoad.push(resolve);
    });
  }

  // Data is already loaded
  return cache[url].data;
};
