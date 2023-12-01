/**
 * Logs a message to the console
 * @param {unknown} message
 */
export const log = {
  warn: (message: unknown) => {
    console.warn(message);
  },
  error: (message: unknown) => {
    console.error(message);
  }
};
