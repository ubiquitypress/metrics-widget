import React from 'react';
import PropTypes from 'prop-types';
import styles from './card-wrapper.module.scss';

const CardWrapper = ({ label, children }) => {
  return (
    <div className={styles.cardWrapper}>
      {label && <h2>{label}</h2>}
      {children}
    </div>
  );
};

export default CardWrapper;

CardWrapper.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node.isRequired
};
