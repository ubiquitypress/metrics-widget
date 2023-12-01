import DOMPurify from 'dompurify';

// Register all our hooks
import './hooks/target-blank';

export const sanitizeHTML = (html: string): string => {
  return DOMPurify.sanitize(html);
};
