import countryCodeFromURI from '../../../utils/country-code-from-uri';
import deepFind from '../../../utils/deep-find';

const countryTable = ({ t, uris, config }) => {
  // Map the country codes
  const codes = {};
  uris.forEach(({ country_uri, value }) => {
    if (country_uri) {
      // Pull the country code from the URI
      let code = countryCodeFromURI(country_uri);

      // Localise the code (ie. "GB" > "United Kingdom") if the config says
      if (deepFind(config, 'settings.localise_country_codes'))
        code = t(`countries.${code}`);

      // Update the object
      codes[code] = codes[code] ? codes[code] + value : value;
    }
  });

  // Map the codes into an array, and sort by value descending
  const data = Object.entries(codes).map(([code, value]) => ({
    key: code,
    value: value.toString()
  }));
  data.sort((a, b) => b.value - a.value);

  // Return the data
  return { data };
};

export default countryTable;
