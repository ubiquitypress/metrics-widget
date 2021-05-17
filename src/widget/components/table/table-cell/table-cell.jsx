import React from 'react';
import PropTypes from 'prop-types';
import styles from './table-cell.module.scss';

const TableCell = ({ head, children }) => {
  const Component = head ? 'th' : 'td';

  return (
    <Component
      className={`${styles['table-cell']} ${head ? 'th' : 'td'}`}
      scope={head ? 'col' : 'row'}
      data-testid='table-cell'
    >
      {children}
    </Component>
  );
};

TableCell.propTypes = {
  head: PropTypes.bool,
  children: PropTypes.node.isRequired
};

TableCell.defaultProps = {
  head: false
};

export default TableCell;
