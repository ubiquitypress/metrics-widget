import React from 'react';
import {
  render as rtlRender,
  waitFor,
  mockUseMetrics
} from '../../utils/test-utils';
import mockTimeGraph from './methods/time-graph';
import mockLineGraph from '../graphs/line-graph/line-graph';
import Graph from './graph';

jest.mock('./methods/time-graph');
jest.mock('../graphs/line-graph/line-graph');

const render = ({
  type = 'type',
  tab = 'tab',
  options = { uris: [] },
  onReady = () => null
} = {}) => {
  return {
    ...rtlRender(
      <Graph type={type} tab={tab} options={options} onReady={onReady} />
    )
  };
};

test('calls `fetchMetric` for every provided URI', async () => {
  const fetchMetric = jest.fn(() => 'abcd');
  mockUseMetrics.mockImplementation(() => ({ fetchMetric }));

  render({ options: { uris: ['a', 'b', 'c'] } });
  await waitFor(() => expect(fetchMetric).toHaveBeenCalledTimes(3));
});

test('calls `methods[type]`', async () => {
  expect(mockTimeGraph).toHaveBeenCalledTimes(0);
  render({ type: 'time_graph' });
  await waitFor(() => expect(mockTimeGraph).toHaveBeenCalledTimes(1));
});

test('returns correct component', async () => {
  mockTimeGraph.mockImplementation(() => 'abc');
  mockLineGraph.mockImplementation(() => null);
  expect(mockLineGraph).toHaveBeenCalledTimes(0);
  render({ type: 'time_graph', uris: ['a', 'b', 'c'] });
  await waitFor(() => expect(mockLineGraph).toHaveBeenCalledTimes(1));
});
