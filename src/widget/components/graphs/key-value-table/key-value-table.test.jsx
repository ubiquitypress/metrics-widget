import React from 'react';
import { render as rtlRender, waitFor } from '../../../utils/test-utils';
import KeyValueTable from './key-value-table';

const render = ({ data = [], onReady = () => null } = {}) => {
  return { ...rtlRender(<KeyValueTable data={data} onReady={onReady} />) };
};

test('renders a message if there is no data', () => {
  const { getByText, queryByTestId } = render();

  getByText('other.no_data');
  expect(queryByTestId('key-value-table')).not.toBeInTheDocument();
});

test('renders table if there is data', () => {
  const { queryByText, getByTestId } = render({
    data: [{ key: 'name', value: 'John' }]
  });

  expect(queryByText('other.no_data')).not.toBeInTheDocument();
  getByTestId('key-value-table');
});

test('calls `onReady` function', async () => {
  const onReady = jest.fn();

  expect(onReady).toHaveBeenCalledTimes(0);
  render({ onReady });
  await waitFor(() => expect(onReady).toHaveBeenCalledTimes(1));
});

test('renders all data', () => {
  const data = [
    { key: 'Vatican City', value: '825' },
    { key: 'Tuvalu', value: '10679' },
    { key: 'Nauru', value: '11832' },
    { key: 'Palau', value: '17957' }
  ];
  const { getByText } = render({ data });

  data.forEach(item => {
    getByText(item.key);
    getByText(parseInt(item.value, 10).toLocaleString('en'));
  });
});
