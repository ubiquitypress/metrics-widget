import { cache } from '../cache';

export const isCached = (url: string) => {
  return cache[url];
};
