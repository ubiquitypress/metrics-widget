import formatTimestamp from './format-timestamp';

test('calls the `t` function with correct values', () => {
  const t = jest.fn(val => {
    return val === 'dates.months'
      ? 'Jan, Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'
      : val;
  });

  formatTimestamp(t, '2021-05-14T10:46:56.247Z');

  expect(t).toHaveBeenCalledWith('dates.format_short', {
    day: 14,
    month: 'May',
    year: 2021
  });
});

test('calls the `t` function with correct values', () => {
  const t = jest.fn(val => {
    return val === 'dates.months'
      ? 'Jan, Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'
      : val;
  });

  formatTimestamp(t, '2030-01-27T10:46:56.247Z', 'long');

  expect(t).toHaveBeenCalledWith('dates.format_long', {
    day: 27,
    month: 'Jan',
    year: 2030
  });
});
