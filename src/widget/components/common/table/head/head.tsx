import React from 'react';
import { cx } from '@/utils';
import { Row, TableRowProps } from '../row';
import styles from './head.module.scss';

export interface TableHeadProps {
  children: React.ReactNode;
  className?: string;
}

export const Head = (props: TableHeadProps) => {
  const { children, className, ...rest } = props;

  // Pass `isHeader` through to any `Row` children
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      if (child.type === Row) {
        return React.cloneElement(child, {
          ...child.props,
          isHeader: true
        } as TableRowProps);
      }
    }
    return child;
  });

  return (
    <thead className={cx(styles['table-head'], className)} {...rest}>
      {childrenWithProps}
    </thead>
  );
};
