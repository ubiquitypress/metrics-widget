import React from 'react';
import { render as rtlRender } from '../../utils/test-utils';
import GraphWrapper from './graph-wrapper';

const render = ({ width = 100, label = 'label', children = <></> } = {}) => {
  return {
    ...rtlRender(
      <GraphWrapper width={width} label={label}>
        {children}
      </GraphWrapper>
    )
  };
};

test('renders children', () => {
  const { getByText } = render({ children: <p>hi!</p> });
  getByText('hi!');
});

test('renders label text', () => {
  const label = 'My graph!';
  const { getByText } = render({ label });

  getByText(label);
});
