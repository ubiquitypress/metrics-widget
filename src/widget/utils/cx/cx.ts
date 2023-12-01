/**
 * A utility function to join class names, similar to the `classnames` package.
 * @example cx(['class1', 'class2', {'class3': true, 'class4': false}]) => 'class1 class2 class3'
 */
export const cx = (...args: unknown[]) => {
  const classes = [];

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    const argType = typeof arg;

    if (!arg) {
      continue;
    }

    if (argType === 'string' || argType === 'number') {
      classes.push(arg);
    } else if (Array.isArray(arg)) {
      classes.push(...arg);
    } else if (argType === 'object') {
      for (const key in arg) {
        if (arg[key as keyof typeof arg]) {
          classes.push(key);
        }
      }
    }
  }

  return classes.join(' ');
};
