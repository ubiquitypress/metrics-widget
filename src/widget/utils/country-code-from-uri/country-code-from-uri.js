const countryCodeFromURI = uri => {
  if (typeof uri !== 'string') return null;

  const split = uri.split(':');
  return split[split.length - 1];
};

export default countryCodeFromURI;
