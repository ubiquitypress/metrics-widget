import { useConfig } from '@/config';
import { getAssetPath } from '@/utils';
import React from 'react';
import styles from './logo.module.scss';

export const Logo = () => {
  const { config } = useConfig();

  return (
    <img
      className={styles['hypothesis-logo']}
      src={getAssetPath('image', 'hypothesis-logo.svg', config)}
    />
  );
};
