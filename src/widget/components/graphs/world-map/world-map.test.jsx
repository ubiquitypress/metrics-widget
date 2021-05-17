import React from 'react';
import {
  mockLoadScript,
  render as rtlRender,
  waitFor
} from '../../../utils/test-utils';
import WorldMap from './world-map';

const defaultData = {
  tab: 'TabName',
  values: {
    GB: 123,
    US: 9191
  }
};
const render = ({ data = defaultData, onReady = () => null } = {}) => {
  return { ...rtlRender(<WorldMap data={data} onReady={onReady} />) };
};

test('renders a message if there is no data', () => {
  window.$ = jest.fn(() => ({
    vectorMap: jest.fn()
  }));

  const { getByText, queryByTestId } = render({ data: { values: {} } });

  getByText('other.no_data');
  expect(queryByTestId('world-map')).not.toBeInTheDocument();
});

test('renders if there is data', () => {
  const { queryByText, getByTestId } = render();

  expect(queryByText('other.no_data')).not.toBeInTheDocument();
  getByTestId('world-map');
});

test('loads 3 scripts', async () => {
  render();

  await waitFor(() => expect(mockLoadScript).toHaveBeenCalledTimes(3));
  expect(mockLoadScript.mock.calls[0][0]).toBe('jquery-3.6.0.min.js');
  expect(mockLoadScript.mock.calls[1][0]).toBe(
    'jquery-jvectormap-2.0.5.min.js'
  );
  expect(mockLoadScript.mock.calls[2][0]).toBe(
    'jquery-jvectormap-world-merc.js'
  );
});

test('calls `onReady` function', async () => {
  const onReady = jest.fn();

  expect(onReady).toHaveBeenCalledTimes(0);
  render({ onReady });
  await waitFor(() => expect(onReady).toHaveBeenCalledTimes(1));
});
