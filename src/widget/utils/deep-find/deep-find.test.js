import deepFind from './deep-find';

test('returns object property', () => {
  const obj = {
    settings: {
      options: {
        controls: {
          forward: 'w',
          backward: 's',
          custom: {
            left: 'j'
          }
        },
        enabled: true
      },
      language: 'en'
    }
  };

  expect(deepFind(obj, 'settings.language')).toBe(obj.settings.language);
  expect(deepFind(obj, 'settings.options.enabled')).toBe(
    obj.settings.options.enabled
  );
  expect(deepFind(obj, 'settings.options.controls.custom.left')).toBe(
    obj.settings.options.controls.custom.left
  );
});

test('returns undefined if property does not exist', () => {
  const obj = {
    first_name: 'John',
    balances: {
      hsbc: 1000,
      natwest: 191,
      barclays: 922
    }
  };

  expect(deepFind(obj, 'last_name')).toBe(undefined);
  expect(deepFind(obj, 'balances.monzo')).toBe(undefined);
});
