import React from 'react';
import { render as rtlRender, waitFor } from '@testing-library/react';
import Wordpress from './wordpress';
import { mockFetchSuccess } from '../../../__mocks__/mockFetch';

afterEach(() => {
  jest.clearAllMocks();
});
afterAll(() => {
  global.fetch.mockClear();
  delete global.fetch;
});

const render = ({
  uris = ['a'],
  activeType = '',
  onReady = jest.fn(),
  hidden = false
} = {}) => {
  return {
    ...rtlRender(
      <Wordpress
        uris={uris}
        activeType={activeType}
        onReady={onReady}
        hidden={hidden}
      />
    )
  };
};

test('renders `wordpress` on success', async () => {
  mockFetchSuccess({ event_uri: 'abc' });
  const { getByTestId } = render();
  await waitFor(() => {
    getByTestId('wordpress');
  });
});

test('renders data on success', async () => {
  const res = [
    {
      event_uri:
        'https://olivialucieblake.com/2020/09/03/how-i-survived-a-seven-day-digital-detox-and-what-i-learnt-from-it-guest-post/',
      expected:
        'how i survived a seven day digital detox and what i learnt from it guest post' // this field does not exist in the API response; only used for testing
    },
    {
      event_uri:
        'https://lovetravellingblog.com/2020/09/07/day-2-a-day-in-florence/',
      expected: 'day 2 a day in florence' // this field does not exist in the API response; only used for testing
    },
    {
      event_uri:
        'https://jborden.com/2020/09/06/it-only-took-34-years-for-me-to-be-the-cool-teacher',
      expected: 'it only took 34 years for me to be the cool teacher' // this field does not exist in the API response; only used for testing
    },
    {
      event_uri:
        'https://lifesfinewhine.com/2020/09/06/how-moving-abroad-changed-my-life',
      expected: 'how moving abroad changed my life' // this field does not exist in the API response; only used for testing
    }
  ];
  mockFetchSuccess(res);
  const { getByText, getByTestId } = render();

  await waitFor(() => {
    getByTestId('wordpress');
  });

  res.forEach(res2 => getByText(res2.expected));
});

test('does not render if `hidden`', async () => {
  mockFetchSuccess({ event_uri: 'abc' });
  const { queryByTestId } = render({ hidden: true });
  await waitFor(() => {
    expect(queryByTestId('wordpress')).not.toBeInTheDocument();
  });
});

test('does not render if no URIs are provided', async () => {
  const { queryByTestId } = render({ uris: [] });
  await waitFor(() => {
    expect(queryByTestId('wordpress')).not.toBeInTheDocument();
  });
});

test('calls `onReady` when data is fetched', async () => {
  const onReady = jest.fn();
  const { getByTestId } = render({ onReady });

  expect(onReady).toHaveBeenCalledTimes(0);
  await waitFor(() => {
    getByTestId('wordpress');
  });
  expect(onReady).toHaveBeenCalledTimes(1);
});

test.todo('error handling with mockFetchFailure');
