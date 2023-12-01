export const getCountryCodeFromUri = (uri: string) => {
  return uri.split(':').pop();
};
