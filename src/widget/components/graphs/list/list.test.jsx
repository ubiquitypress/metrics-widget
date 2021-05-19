import React from 'react';
import { render as rtlRender, waitFor } from '../../../utils/test-utils';
import List from './list';

const render = ({ data = [], onReady = () => null } = {}) => {
  return { ...rtlRender(<List data={data} onReady={onReady} />) };
};

test('renders a message if there is no data', () => {
  const { getByText, queryByTestId } = render();

  getByText('other.no_data');
  expect(queryByTestId('key-value-table')).not.toBeInTheDocument();
});

test('renders list if there is data', () => {
  const { queryByText, getByTestId } = render({
    data: [{ name: 'John' }, { name: 'Ringo' }]
  });

  expect(queryByText('other.no_data')).not.toBeInTheDocument();
  getByTestId('list');
});

test('calls `onReady` function', async () => {
  const onReady = jest.fn();

  expect(onReady).toHaveBeenCalledTimes(0);
  render({ onReady });
  await waitFor(() => expect(onReady).toHaveBeenCalledTimes(1));
});

test('renders all data', () => {
  const data = [
    { name: 'Alpha', link: 'https://en.wikipedia.org/wiki/Alpha' },
    { name: 'Bravo' },
    { name: 'Charlie', link: 'https://en.wikipedia.org/wiki/Charlie' },
    { name: 'Delta' }
  ];
  const { getByText, getByRole, queryByRole } = render({ data });
  data.forEach(item => {
    getByText(item.name);
    if (item.link) {
      const link = getByRole('link', { name: item.name });
      expect(link).toHaveAttribute('href', item.link);
    } else {
      expect(queryByRole('link', { name: item.name })).not.toBeInTheDocument();
    }
  });
});
