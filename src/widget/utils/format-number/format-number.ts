/**
 * Formats a number using the browser's locale.
 * @param {number} num
 */
export const formatNumber = (num: number, locale?: string): string => {
  return num.toLocaleString(locale || 'en-US');
};
