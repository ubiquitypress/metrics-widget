import mergeDeep from './merge-deep';

test('merges two non-identical objects', () => {
  const a = { name: 'John' };
  const b = { age: 32 };
  expect(mergeDeep(a, b)).toStrictEqual({ ...a, ...b });
});

test('merges two similar objects', () => {
  const a = {
    name: 'John',
    age: 32
  };
  const b = {
    name: 'Amy'
  };

  expect(mergeDeep(a, b)).toStrictEqual({ name: 'Amy', age: 32 });
});
