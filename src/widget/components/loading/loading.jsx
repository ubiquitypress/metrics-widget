import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from '../../contexts/i18n';
import styles from './loading.module.scss';

const Loading = ({ message }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.loading}>
      <div className={styles.bars}>
        <div className={styles.loadingBar} />
        <div className={styles.loadingBar} />
        <div className={styles.loadingBar} />
      </div>
      <div className={styles.message}>
        <p role='alert' aria-busy='true'>
          {message || t('loading.default')}
        </p>
      </div>
    </div>
  );
};

Loading.propTypes = {
  message: PropTypes.string
};
Loading.defaultProps = {
  message: null
};

export default Loading;
