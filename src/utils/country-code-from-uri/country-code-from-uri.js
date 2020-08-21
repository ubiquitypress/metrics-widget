import PropTypes from 'prop-types';

const countryCodeFromURI = uri => {
  if (!uri) return null;
  if (typeof uri !== 'string') return null;

  let code = uri.split(':');
  code = code[code.length - 1];
  return code;
};

countryCodeFromURI.propTypes = {
  uri: PropTypes.string
};

export default countryCodeFromURI;
