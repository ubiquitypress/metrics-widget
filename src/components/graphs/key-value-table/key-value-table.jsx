import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import getString from '../../../localisation/get-string/get-string';
import styles from './key-value-table.module.scss';

const KeyValueTable = ({ data, options = {} }) => {
  return (
    <ul
      className={classnames(styles.table, {
        [styles.capitalize]: options.capitalize
      })}
      data-testid='key-value-table'
    >
      {/* Show a message if no data is found */}
      {data.length === 0 && (
        <li className={styles.empty}>{getString('other.no_data')}</li>
      )}

      {/* Otherwise, loop through each element */}
      {data.map(item => (
        <li key={item.key}>
          <div className={styles.key}>
            {item.keyLink ? (
              <a href={item.keyLink} target='_blank' rel='noopener noreferrer'>
                {item.key}
              </a>
            ) : (
              item.key
            )}
          </div>
          <div className={styles.value}>{item.value}</div>
        </li>
      ))}
    </ul>
  );
};

KeyValueTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string,
      link: PropTypes.string
    })
  ).isRequired,
  options: PropTypes.shape({
    capitalize: PropTypes.bool
  })
};
KeyValueTable.defaultProps = {
  options: {}
};

export default KeyValueTable;
