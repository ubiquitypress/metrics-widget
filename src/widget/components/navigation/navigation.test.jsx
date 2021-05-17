import React from 'react';
import userEvent from '@testing-library/user-event';
import { render as rtlRender, act } from '../../utils/test-utils';
import Navigation from './navigation';

const render = ({ tabs = [], active = null, setTab = jest.fn() } = {}) => {
  return {
    ...rtlRender(<Navigation tabs={tabs} active={active} setTab={setTab} />)
  };
};

test('renders all tabs', () => {
  const tabs = [
    { name: 'tab1', count: 122 },
    { name: 'tab2', count: 1019 },
    { name: 'tab3', count: 919119 }
  ];
  const { getByTestId, getByText } = render({ tabs, active: 'tab2' });

  tabs.forEach(tab => {
    const el = getByTestId(`nav-tab-${tab.name}`);

    // Values
    getByText(`tabs.${tab.name}`);
    getByText(tab.count.toLocaleString('en'));

    // Accessibility
    expect(el).toHaveAttribute('role', 'tab');
    expect(el).toHaveAttribute('type', 'button');
    expect(el).toHaveAttribute(
      'aria-selected',
      (tab.name === 'tab2').toString()
    );
    expect(el).toHaveAttribute('aria-controls');
  });
});

test('clicking on a tab calls `setTab` function', () => {
  const setTab = jest.fn();
  const tabs = [
    { name: 'tab1', count: 3 },
    { name: 'tab2', count: 2 }
  ];
  const { getByTestId } = render({ tabs, setTab });

  expect(setTab).toHaveBeenCalledTimes(0);
  const tab = getByTestId(`nav-tab-${tabs[0].name}`);

  act(() => userEvent.click(tab));
  expect(setTab).toHaveBeenCalledTimes(1);
});
