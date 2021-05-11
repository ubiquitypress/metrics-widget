import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from '../../contexts/i18n';
import styles from './navigation.module.scss';

const Navigation = ({ tabs, active, setTab }) => {
  const { lang, t } = useTranslation();

  return (
    <div
      className={styles.navigation}
      role='tablist'
      aria-label={t('general.title')}
    >
      {tabs.map(({ name, count }) => (
        <button
          key={name}
          className={`${styles['navigation-button']}${
            active === name ? ' active' : ''
          }`}
          role='tab'
          type='button'
          aria-selected={active === name}
          aria-controls={`mw-tabpanel-${name}`}
          id={`mw-tab-${name}`}
          onClick={() => setTab(name)}
        >
          <div className={styles['navigation-count']}>
            {count.toLocaleString(lang)}
          </div>
          <div className={styles['navigation-name']}>{t(`tabs.${name}`)}</div>
        </button>
      ))}
    </div>
  );
};

Navigation.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      nav_counts: PropTypes.arrayOf(PropTypes.string),
      count: PropTypes.number
    })
  ).isRequired,
  active: PropTypes.string,
  setTab: PropTypes.func.isRequired
};
Navigation.defaultProps = {
  active: null
};

export default Navigation;
