import trimString from './trim-string';

test('returns `null` if type is not string', () => {
  const t = jest.fn();
  expect(trimString(t)).toBe(null);
  expect(trimString(t, 123)).toBe(null);
  expect(trimString(t, {})).toBe(null);
});

test('returns full string if length is less than limit', () => {
  const t = jest.fn();
  expect(trimString(t, 'hello', 100)).toBe('hello');
  expect(trimString(t, 'hi', 2)).toBe('hi');
});

test('returns localised truncated string if length is greater than limit', () => {
  const t = jest.fn();

  trimString(t, 'hello', 2);
  expect(t).toHaveBeenCalledWith('other.trimmed_string', { string: 'he' });
});
