import React from 'react';
import PropTypes from 'prop-types';
import convertWidth from '../../utils/convert-width/convert-width';
import styles from './card-wrapper.module.scss';

const CardWrapper = ({
  label,
  width = 50,
  children,
  'data-testid': testId
}) => {
  return (
    <li
      className={styles.cardWrapper}
      style={{ width: convertWidth(width) }}
      data-testid={testId}
    >
      {label && <h2>{label}</h2>}
      {children}
    </li>
  );
};

export default CardWrapper;

CardWrapper.propTypes = {
  label: PropTypes.string,
  width: PropTypes.number,
  children: PropTypes.node.isRequired,
  'data-testid': PropTypes.string
};
CardWrapper.defaultProps = {
  label: null,
  width: 50,
  'data-testid': null
};
