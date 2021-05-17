const hypothesis = async ({ uris }) => {
  // Get all Hypothesis IDs
  const ids = uris.map(uri => {
    return uri.event_uri.indexOf('hypothes.is') !== -1
      ? uri.event_uri.replace(/.*hypothes.is\/a\//g, '')
      : null;
  });

  // Convert the IDs to URLs
  const urls = ids.map(id => `https://api.hypothes.is/api/annotations/${id}`);

  // Fetch the data from each URL
  const data = [];
  await Promise.all(
    urls.map(async url => {
      const res = await fetch(url);
      const json = await res.json();
      data.push(json);
    })
  );

  // Return the data
  return { data };
};

export default hypothesis;
