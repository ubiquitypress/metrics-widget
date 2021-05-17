import React from 'react';
import {
  mockLoadScript,
  render as rtlRender,
  waitFor
} from '../../../utils/test-utils';
import LineGraph from './line-graph';

const defaultData = {
  seriesData: [1, 2, 3],
  seriesName: 'Views',
  xAxisCategories: ['2019', '2020', '2021']
};
const render = ({ data = defaultData, onReady = () => null } = {}) => {
  return { ...rtlRender(<LineGraph data={data} onReady={onReady} />) };
};

test('renders a message if there is no data', () => {
  const { getByText, queryByTestId } = render({ data: { seriesData: [] } });

  getByText('other.no_data');
  expect(queryByTestId('line-graph')).not.toBeInTheDocument();
});

test('renders if there is data', () => {
  const { queryByText, getByTestId } = render({
    data: {
      seriesData: [1, 2, 3],
      seriesName: 'Views',
      xAxisCategories: ['2019', '2020', '2021']
    }
  });

  expect(queryByText('other.no_data')).not.toBeInTheDocument();
  getByTestId('line-graph');
});

test('loads `chart.js` script', async () => {
  render();

  await waitFor(() => expect(mockLoadScript).toHaveBeenCalledTimes(1));
  expect(mockLoadScript.mock.calls[0][0]).toBe('chart.js');
});

test('calls `onReady` function', async () => {
  const onReady = jest.fn();

  expect(onReady).toHaveBeenCalledTimes(0);
  render({ onReady });
  await waitFor(() => expect(onReady).toHaveBeenCalledTimes(1));
});
