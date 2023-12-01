import { Config, DatasetRange } from '@/types';

export const formatDate = (date: Date, range: DatasetRange, config: Config) => {
  if (range === 'days') {
    return new Date(date.toISOString().split('T')[0]).toLocaleDateString(
      config.settings.locale,
      { day: 'numeric', month: 'short', year: 'numeric' }
    );
  } else if (range === 'months') {
    return new Date(
      date.toISOString().split('-').slice(0, 2).join('-')
    ).toLocaleDateString(config.settings.locale, {
      month: 'short',
      year: 'numeric'
    });
  } else if (range === 'years') {
    return new Date(date.toISOString().split('-')[0]).toLocaleDateString(
      config.settings.locale,
      { year: 'numeric' }
    );
  }
};
