const wordpress = ({ uris }) => {
  // Fetch only URIs that contain an `event_uri`, and return
  // an array of just the `event_uri` fields
  const items = uris.filter(item => item.event_uri).map(item => item.event_uri);

  // Sort alphabetically
  items.sort();

  // Convert into an array of objects
  const data = items.map(uri => {
    // Replace the key to be a string
    let name = uri.replace(/\/$/, ''); // Remove trailing slash, if present
    name = name.substr(name.lastIndexOf('/') + 1); // Get all text after the last slash
    name = name.replace(/-/g, ' ');

    return { name, link: uri };
  });

  return { data };
};

export default wordpress;
