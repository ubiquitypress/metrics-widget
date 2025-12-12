import type { ChartConstructor, Config, Graphs } from '@/types';

export type GraphScriptLoader = { [key in Graphs]: () => Promise<void> };

/**
 * Eager loaders for npm build to avoid runtime chunk fetches in consumers.
 */
export const graphScripts = (_config: Config): GraphScriptLoader => {
  return {
    text: async () => undefined,
    line: async () => {
      // Return a promise to satisfy the async signature
      await Promise.resolve();
      const chartModule = require('chart.js/auto');
      const Chart =
        (chartModule as { default?: ChartConstructor }).default ||
        (chartModule as { Chart?: ChartConstructor }).Chart;
      if (Chart) {
        (globalThis as typeof globalThis & { Chart?: ChartConstructor }).Chart =
          Chart;
      }
    },
    country_table: async () => undefined,
    world_map: async () => {
      // Return a promise to satisfy the async signature
      await Promise.resolve();
      const jqModule = require('jquery');
      const $ = (jqModule as { default?: unknown }).default || jqModule;

      // jvectormap relies on a global jQuery instance
      if (!(globalThis as typeof globalThis & { $?: unknown }).$) {
        (globalThis as typeof globalThis & { $?: unknown }).$ = $;
        (globalThis as typeof globalThis & { jQuery?: unknown }).jQuery = $;
      }

      require('jvectormap');

      const mapModule = require('jvectormap-content/world-merc');
      const mapData =
        (mapModule as { default?: unknown }).default || (mapModule as unknown);

      // Register the map so it can be referenced by name
      if (
        typeof ($ as { fn?: { vectorMap?: unknown } }).fn?.vectorMap ===
        'function'
      ) {
        (
          $ as typeof $ & {
            fn?: {
              vectorMap?: (cmd: string, name: string, data: unknown) => void;
            };
          }
        ).fn?.vectorMap?.('addMap', 'world_merc', mapData);
      }
    },
    hypothesis_table: async () => undefined,
    tweets: async () => {
      const twitterWidgets = require('twitter-widgets');
      const load =
        (
          twitterWidgets as {
            load?: (callback?: (error?: Error) => void) => void;
          }
        ).load ||
        (
          twitterWidgets as {
            default?: { load?: (callback?: (error?: Error) => void) => void };
          }
        ).default?.load;

      if (!load) {
        return;
      }

      await new Promise<void>((resolve, reject) => {
        load(error => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      });
    },
    list: async () => undefined,
    citations: async () => undefined
  };
};
