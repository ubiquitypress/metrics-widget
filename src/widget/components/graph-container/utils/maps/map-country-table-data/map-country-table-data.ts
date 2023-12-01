import { Config, GraphData } from '@/types';
import { getCountryCodeFromUri } from '@/utils';

export const mapCountryTableData = (data: GraphData, config: Config) => {
  // Store each country's data in an object
  const countries: Record<string, number> = {};

  // Loop through each country
  data.merged.forEach(event => {
    // Get the country from the event
    const { country_uri } = event;

    // If the country exists, add the value to the object
    if (country_uri) {
      const code = getCountryCodeFromUri(country_uri);
      if (code) {
        if (countries[code]) {
          countries[code] += event.value;
        } else {
          countries[code] = event.value;
        }
      }
    }
  });

  // Make a new Intl object to localise the country names
  const { locale } = config.settings;
  const regionNames = new Intl.DisplayNames([locale], { type: 'region' });

  // Make an array of the countries
  const list = Object.entries(countries).map(([key, value]) => {
    return {
      key: regionNames.of(key) || key,
      value
    };
  });

  // Sort the countries by value
  list.sort((a, b) => b.value - a.value);

  // Return the list
  return list;
};
