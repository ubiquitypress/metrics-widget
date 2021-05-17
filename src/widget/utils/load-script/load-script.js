/* eslint-disable consistent-return */
import getAsset from '../get-asset';

const loadScript = (name, callback) => {
  const src = getAsset(name);
  const [id] = name.split('.');

  // Has the script already been inserted?
  const existing = document.getElementById(id);
  if (existing) {
    // Has it already loaded?
    if (existing.dataset.loaded === 'true') return callback();

    // Listen for the DOM event change, from `[loaded='false']` to `[loaded='true']`
    const MutationObserver =
      window.MutationObserver || window.WebKitMutationObserver;
    const observer = new MutationObserver(() => callback());
    observer.observe(existing, {
      subtree: true,
      attributes: true
    });
  }

  // Script does not exist yet, create it
  else {
    const script = document.createElement('script');
    script.src = src;
    script.id = id;
    script.dataset.loaded = false;
    document.body.appendChild(script);
    script.onload = () => {
      script.dataset.loaded = true;
      callback();
    };
  }
};

export default loadScript;
