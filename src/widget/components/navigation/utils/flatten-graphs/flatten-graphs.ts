import type { Graph, GraphRowObject } from '@/types';

/**
 * Normalizes tab graph definitions so rows with `graphs` are expanded into a flat list.
 * @param graphOrRow - A single graph or a row object containing multiple graphs
 */
export const flattenGraphs = (graphOrRow: Graph | GraphRowObject): Graph[] => {
  if ('graphs' in graphOrRow) {
    return graphOrRow.graphs;
  }
  return [graphOrRow];
};
