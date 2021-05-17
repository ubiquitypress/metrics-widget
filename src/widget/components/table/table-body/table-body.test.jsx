import React from 'react';
import { render as rtlRender } from '../../../utils/test-utils';
import TableBody from './index';

const render = ({ children = <></> } = {}) => {
  return {
    ...rtlRender(
      <table>
        <TableBody>{children}</TableBody>
      </table>
    )
  };
};

test('renders a <tbody /> component', () => {
  const { getByTestId } = render();
  const tbody = getByTestId('table-body');
  expect(tbody).toContainHTML('<tbody');
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
