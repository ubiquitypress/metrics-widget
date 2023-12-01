import { useIntl } from '@/i18n';
import React from 'react';
import styles from './loading.module.scss';

export const Loading = () => {
  const { t } = useIntl();

  return <div className={styles['loading']}>{t('loading')}</div>;
};
