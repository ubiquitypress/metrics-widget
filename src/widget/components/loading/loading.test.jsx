import React from 'react';
import { render as rtlRender } from '../../utils/test-utils';
import Loading from './loading';

const render = ({ message = 'Loading' } = {}) => {
  return { ...rtlRender(<Loading message={message} />) };
};

test('renders accessible alert', () => {
  const { getByRole } = render();

  const alert = getByRole('alert');
  expect(alert).toHaveAttribute('aria-busy');
});

test('renders message text', () => {
  const message = 'Loading message';
  const { getByText } = render({ message });

  getByText(message);
});

test('renders default message if none is provided', () => {
  const { getByText } = render({ message: '' });
  getByText('loading.default');
});
