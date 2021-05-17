import React from 'react';
import { render as rtlRender } from '../../../utils/test-utils';
import Table from './index';

const render = ({ children = <></> } = {}) => {
  return { ...rtlRender(<Table>{children}</Table>) };
};

test('renders a <table /> component', () => {
  const { getByTestId } = render();
  const table = getByTestId('table');
  expect(table).toContainHTML('<table');
});

test('renders children', () => {
  const { getByText } = render({
    children: (
      <tbody>
        <tr>
          <td>child</td>
        </tr>
      </tbody>
    )
  });
  getByText('child');
});
