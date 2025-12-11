import type { Graph, GraphRowObject } from '@/types';

/**
 * Normalizes tab graph definitions so rows with `graphs` are expanded into a flat list.
 * @param graphs - A single graph or a row object containing multiple graphs
 */
export const flattenGraphs = (graphs: Graph | GraphRowObject): Graph[] => {
  if ('graphs' in graphs) {
    return graphs.graphs;
  }
  return [graphs];
};
