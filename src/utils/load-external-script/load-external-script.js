import ids from './ids.json';
import getVersion from '../get-version/get-version';

// eslint-disable-next-line consistent-return
const loadExternalScript = (id, callback) => {
  // Make sure the script is predefined
  if (!ids[id])
    return console.error(
      `Could not find external script '${id}'. Does it exist in ids.json?`
    );
  if (!callback)
    return console.error(`Missing callback on loading external script '${id}'`);

  // Has the script already been inserted?
  const existingScript = document.getElementById(id);
  if (existingScript) return callback();

  // Replace the version dynamically
  ids[id] = ids[id].replace(
    '{version}',
    process.env.NODE_ENV === 'development' ? 'dev' : getVersion()
  );

  // Create a new script
  const script = document.createElement('script');
  script.src = ids[id];
  script.id = id;
  document.body.appendChild(script);
  script.onload = () => callback();
};

export default loadExternalScript;
