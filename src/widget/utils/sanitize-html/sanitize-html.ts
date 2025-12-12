import createDOMPurify, { type DOMPurify } from 'dompurify';
import { registerTargetBlankHook } from './hooks/target-blank';

let domPurifyInstance: DOMPurify | null = null;
let hooksRegistered = false;

const getDOMPurify = (): DOMPurify | null => {
  if (domPurifyInstance) {
    return domPurifyInstance;
  }

  if (typeof window === 'undefined') {
    return null;
  }

  domPurifyInstance = createDOMPurify(window);

  if (!hooksRegistered && domPurifyInstance) {
    registerTargetBlankHook(domPurifyInstance);
    hooksRegistered = true;
  }

  return domPurifyInstance;
};

export const sanitizeHTML = (html: string): string => {
  const purifier = getDOMPurify();
  if (!purifier) {
    // SSR or non-browser: return raw HTML to avoid crashing
    return html;
  }
  return purifier.sanitize(html);
};
