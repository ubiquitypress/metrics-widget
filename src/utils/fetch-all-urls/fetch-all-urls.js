const fetchAllUrls = async (urls, callback) => {
  // Call fetch() on all URLs provided
  await Promise.all(urls.map(url => fetch(url)))
    // Parse the `responses` array into JSON and pull the `data` field from the JSON
    .then(responses => {
      Promise.all(
        responses.map(res => res.json().then(json => json.data))
        // Return the response's `data` field
      ).then(json => {
        return callback(json);
      });
    });
};

export default fetchAllUrls;
