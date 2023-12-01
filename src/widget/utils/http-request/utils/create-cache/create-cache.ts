import { cache } from '../cache';

export const createCache = (url: string) => {
  cache[url] = { loading: true, onLoad: [] };
};
