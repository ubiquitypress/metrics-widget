import { ExternalScript } from '@/config';
import { loadExternalScript } from '@/utils';

/**
 * Loads each script in the array of scripts, in order.
 */
export const loadScripts = async (scripts: ExternalScript[]) => {
  if (scripts) {
    for (let i = 0; i < scripts.length; i++) {
      await loadExternalScript(scripts[i]);
    }
  }

  return Promise.resolve();
};
