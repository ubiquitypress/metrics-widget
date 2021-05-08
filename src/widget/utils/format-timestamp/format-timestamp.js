const formatTimestamp = (t, timestamp, format) => {
  const date = new Date(timestamp);
  const months = t('dates.months').split(',');

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return t(format === 'long' ? 'dates.format_long' : 'dates.format_short', {
    day,
    month,
    year
  });
};

export default formatTimestamp;
