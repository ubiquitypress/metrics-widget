import convertWidth from './convert-width';

test('converts number into percentage string', () => {
  const num = Math.floor(Math.random() * 101);
  expect(convertWidth(num)).toBe(`${num}%`);
});

test('converts string without trailing % into percentage string', () => {
  const num = Math.floor(Math.random() * 101);
  const str = num.toString();
  expect(convertWidth(str)).toBe(`${str}%`);
});

test('returns string with trailing %', () => {
  const num = Math.floor(Math.random() * 101);
  const str = `${num}%`;
  expect(convertWidth(str)).toBe(str);
});

test('returns 0% if argument is not a string or number', () => {
  expect(convertWidth([0, 1])).toBe('0%');
  expect(convertWidth({ name: 'John' })).toBe('0%');
  expect(convertWidth(null)).toBe('0%');
});
