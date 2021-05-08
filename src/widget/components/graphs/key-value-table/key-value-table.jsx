import React from 'react';
import PropTypes from 'prop-types';
import styles from './key-value-table.module.scss';

const KeyValueTable = ({ data }) => {
  return (
    <ul className={styles['key-value-table']}>
      {data.map(item => (
        <li key={item.key} className={styles['key-value-table-item']}>
          <div className={styles['key-value-table-item-key']}>{item.key}</div>
          <div className={styles['key-value-table-item-value']}>
            {item.value}
          </div>
        </li>
      ))}
    </ul>
  );
};

KeyValueTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired
};

export default KeyValueTable;
