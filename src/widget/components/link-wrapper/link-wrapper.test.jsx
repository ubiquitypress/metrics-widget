import React from 'react';
import { render as rtlRender } from '../../utils/test-utils';
import LinkWrapper from './link-wrapper';

const render = ({ href = '#', children = <></> } = {}) => {
  return { ...rtlRender(<LinkWrapper href={href}>{children}</LinkWrapper>) };
};

test('renders children', () => {
  const { getByText } = render({ children: <p>hi!</p> });
  getByText('hi!');
});

test('renders link with correct href value', () => {
  const href = 'https://google.com';
  const { getByRole } = render({ href });

  const link = getByRole('link');
  expect(link).toHaveAttribute('href', href);
  expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  expect(link).toHaveAttribute('target', '_blank');
});

test('does not render if href is missing', () => {
  const { queryByRole } = render({ href: '' });
  expect(queryByRole('link')).not.toBeInTheDocument();
});
