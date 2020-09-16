import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import CardWrapper from './card-wrapper';

const render = ({
  label,
  children = <></>,
  testId,
  hideLabel = false
} = {}) => {
  return {
    ...rtlRender(
      <CardWrapper label={label} hideLabel={hideLabel} data-testid={testId}>
        {children}
      </CardWrapper>
    )
  };
};

test('renders a label with a heading if provided', () => {
  const { getByRole } = render({ label: 'test' });
  const label = getByRole('heading');
  expect(label).toContainHTML('test');
  expect(label).toHaveAttribute('aria-hidden', 'false');
});

test('renders a hidden label if `hideLabel` is true', () => {
  const { getByText } = render({ label: 'test', hideLabel: true });
  const label = getByText('test');
  expect(label).toHaveAttribute('aria-hidden', 'true');
});

test('does not render a label if not provided', () => {
  const { queryByRole } = render({});
  expect(queryByRole('heading')).not.toBeInTheDocument();
});

test('renders test-id prop is provided', () => {
  const { getByTestId } = render({ testId: 'card-wrapper' });
  getByTestId('card-wrapper');
});

test('renders children', () => {
  const { getByText } = render({ children: <p>Hello world</p> });
  getByText('Hello world');
});
