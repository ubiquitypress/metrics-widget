const wikipediaArticles = ({ uris }) => {
  // Fetch only URIs that contain an `event_uri`, and return
  // an array of just the `event_uri` fields
  const items = uris.filter(item => item.event_uri).map(item => item.event_uri);

  // Sort alphabetically
  items.sort();

  // Convert into an object of {key: value} data
  const data = items.map(uri => {
    // Replace the key to be a string
    let key = uri.replace(/.*\/wiki\//g, '');
    key = key.replace(/_/g, ' ');
    key = decodeURIComponent(key);

    return { key, link: uri, value: null };
  });

  return { data };
};

export default wikipediaArticles;
