import { escapeRegex } from '../escape-regex';

/**
 * Replaces `{key}` placeholders in a template string with provided values, escaping
 * placeholder names to avoid regex collisions.
 * @param template - The string containing `{placeholder}` tokens.
 * @param vars - Key/value map used to replace placeholders.
 */
export const interpolate = (
  template: string,
  vars: Record<string, string | number>
) =>
  Object.keys(vars).reduce((acc, varKey) => {
    return acc.replace(
      new RegExp(`{${escapeRegex(varKey)}}`, 'g'),
      String(vars[varKey])
    );
  }, template);
