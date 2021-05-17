import React from 'react';
import { render as rtlRender } from '../../../utils/test-utils';
import TableHead from './table-head';

const render = ({ children = <></> } = {}) => {
  return {
    ...rtlRender(
      <table>
        <TableHead>{children}</TableHead>
      </table>
    )
  };
};

test('renders a <thead /> component', () => {
  const { getByTestId } = render();
  const thead = getByTestId('table-head');
  expect(thead).toContainHTML('<thead');
});

test('renders children', () => {
  const { getByText } = render({
    children: (
      <tr>
        <td>child</td>
      </tr>
    )
  });
  getByText('child');
});
