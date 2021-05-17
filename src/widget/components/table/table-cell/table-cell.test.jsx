import React from 'react';
import { render as rtlRender } from '../../../utils/test-utils';
import TableCell from './table-cell';

const render = ({ head, children = <></> } = {}) => {
  return {
    ...rtlRender(
      <table>
        <tbody>
          <tr>
            <TableCell head={head}>{children}</TableCell>
          </tr>
        </tbody>
      </table>
    )
  };
};

test('renders a <td /> component by default', () => {
  const { getByTestId } = render();
  const td = getByTestId('table-cell');
  expect(td).toContainHTML('<td');
  expect(td).toHaveAttribute('scope', 'row');
});

test('renders a <th /> component if `head` prop is provided', () => {
  const { getByTestId } = render({ head: true });
  const th = getByTestId('table-cell');
  expect(th).toContainHTML('<th');
  expect(th).toHaveAttribute('scope', 'col');
});
