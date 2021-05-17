import React from 'react';
import userEvent from '@testing-library/user-event';
import {
  mockLoadScript,
  render as rtlRender,
  waitFor
} from '../../../utils/test-utils';
import Tweets from './tweets';
import MockTweet from './tweet/tweet';

jest.mock('./tweet/tweet');

MockTweet.mockImplementation(() => null);

const render = ({ data = [], onReady = () => null } = {}) => {
  return { ...rtlRender(<Tweets data={data} onReady={onReady} />) };
};

test('renders a message if there is no data', () => {
  const { getByText, queryByTestId } = render();

  getByText('other.no_data');
  expect(queryByTestId('tweets')).not.toBeInTheDocument();
});

test('loads `twitter.js` script if there is data', async () => {
  render({ data: ['1', '2', '3'] });

  await waitFor(() => expect(mockLoadScript).toHaveBeenCalledTimes(1));
  expect(mockLoadScript.mock.calls[0][0]).toBe('twitter.js');
});

test('renders if there is data', () => {
  const { queryByText, getByTestId } = render({ data: ['1', '2', '3'] });

  expect(queryByText('other.no_data')).not.toBeInTheDocument();
  getByTestId('tweets');
});

test('renders first 5 tweets only', () => {
  render({ data: ['1', '2', '3', '4', '5', '6', '7'] });

  expect(MockTweet).toHaveBeenCalledTimes(5);
});

test('renders `view more` button if there are >5 tweets', () => {
  const { getByRole } = render({ data: ['1', '2', '3', '4', '5', '6', '7'] });
  getByRole('button', { name: /view_more/i });
});

test('does not render `view more` button if there are <5 tweets', () => {
  const { queryByRole } = render({ data: ['1'] });
  expect(queryByRole('button', { name: /view_more/i })).not.toBeInTheDocument();
});

test('clicking `view more` button renders more tweets', () => {
  const { getByRole, queryByRole } = render({
    data: ['1', '2', '3', '4', '5', '6', '7']
  });
  const button = getByRole('button', { name: /view_more/i });

  expect(MockTweet).toHaveBeenCalledTimes(5);
  userEvent.click(button);
  expect(MockTweet).toHaveBeenCalledTimes(5 + 7); // (first render + second render)

  expect(queryByRole('button', { name: /view_more/i })).not.toBeInTheDocument();
});
