import { DatasetRange } from '@/types';

export const incrementDate = (date: Date, range: DatasetRange): Date => {
  if (range === 'days') {
    date.setUTCDate(date.getUTCDate() + 1);
  } else if (range === 'months') {
    date.setUTCDate(1);
    date.setUTCMonth(date.getUTCMonth() + 1);
  } else if (range === 'years') {
    date.setUTCMonth(1);
    date.setUTCFullYear(date.getUTCFullYear() + 1);
  }
  return date;
};
