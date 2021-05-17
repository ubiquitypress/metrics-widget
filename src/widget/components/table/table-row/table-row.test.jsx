import React from 'react';
import { render as rtlRender } from '../../../utils/test-utils';
import TableRow from './table-row';

const render = ({ children = <></> } = {}) => {
  return {
    ...rtlRender(
      <table>
        <tbody>
          <TableRow>{children}</TableRow>
        </tbody>
      </table>
    )
  };
};

test('renders a <tr /> component', () => {
  const { getByTestId } = render();
  const tr = getByTestId('table-row');
  expect(tr).toContainHTML('<tr');
});

test('renders children', () => {
  const { getByText } = render({
    children: <td>child</td>
  });
  getByText('child');
});
