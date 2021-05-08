const trimString = (t, str, length) => {
  if (typeof str !== 'string') return null;

  if (str.length <= length) return str;
  return t('other.trimmed_string', { string: str.substr(0, length) });
};

export default trimString;
