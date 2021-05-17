import countryCodeFromURI from './country-code-from-uri';

test('returns `null` if argument is not a string', () => {
  expect(countryCodeFromURI()).toBe(null);
  expect(countryCodeFromURI(123)).toBe(null);
  expect(countryCodeFromURI({})).toBe(null);
});

test('returns last section of string split by `:`', () => {
  expect(countryCodeFromURI('abc')).toBe('abc');
  expect(countryCodeFromURI('abc:123')).toBe('123');
  expect(countryCodeFromURI('abc:123:def:456:geh')).toBe('geh');
});
