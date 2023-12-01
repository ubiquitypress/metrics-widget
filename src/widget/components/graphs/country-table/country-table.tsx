import React from 'react';
import { GraphEmptyMessage } from '@/components/common';
import { useConfig } from '@/config';
import { formatNumber } from '@/utils';
import styles from './country-table.module.scss';

interface CountryTableProps {
  id?: string;
  data: {
    key: string;
    value: number;
  }[];
}

export const CountryTable = (props: CountryTableProps) => {
  const { id, data } = props;
  const { config } = useConfig();

  if (!data.length) return <GraphEmptyMessage />;
  return (
    <ul id={id} className={styles['country-table']}>
      {data.map(item => (
        <li key={item.key} className={styles['country-table-item']}>
          <div className={styles['country-table-item-key']}>{item.key}</div>
          <div className={styles['country-table-item-value']}>
            {formatNumber(item.value, config.settings.locale)}
          </div>
        </li>
      ))}
    </ul>
  );
};
