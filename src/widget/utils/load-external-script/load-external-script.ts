import { ExternalScript } from '@/config';
import { getState, setState } from './utils';

export const loadExternalScript = async (
  script: ExternalScript
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const { id, url } = script;

    // Check if the script has already been loaded before
    let element = document.getElementById(id) as HTMLScriptElement;

    // If the script has already been loaded, resolve the promise
    if (element && getState(element) === 'loaded') {
      resolve();
      return;
    }

    // Create a new script element if it doesn't exist
    if (!element) {
      element = document.createElement('script');
      element.id = id;
      element.type = 'text/javascript';
      element.src = url;
      element.referrerPolicy = 'no-referrer';
      document.head.appendChild(element);
    }

    // Set the script state to loading
    setState(element, 'loading');

    // Wait for the script to load before resolving the promise
    element.addEventListener('load', () => {
      setState(element, 'loaded');
      resolve();
    });

    // If the script fails to load, reject the promise
    element.addEventListener('error', error => {
      reject(error);
    });
  });
};
