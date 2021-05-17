import React from 'react';
import { render as rtlRender, waitFor } from '../../../utils/test-utils';
import Hypothesis from './hypothesis';

const render = ({ data = [], onReady = () => null } = {}) => {
  return { ...rtlRender(<Hypothesis data={data} onReady={onReady} />) };
};

test('renders a message if there is no data', () => {
  const { getByText, queryByTestId } = render();

  getByText('other.no_data');
  expect(queryByTestId('hypothesis')).not.toBeInTheDocument();
});

test('renders table if there is data', () => {
  const { queryByText, getByTestId } = render({ data: [{ id: '1' }] });

  expect(queryByText('other.no_data')).not.toBeInTheDocument();
  getByTestId('hypothesis');
});

test('calls `onReady` function', async () => {
  const onReady = jest.fn();

  expect(onReady).toHaveBeenCalledTimes(0);
  render({ onReady });
  await waitFor(() => expect(onReady).toHaveBeenCalledTimes(1));
});

test('renders all data', () => {
  const data = [
    {
      id: '1',
      created: '2021-05-15T18:45:32.922Z',
      user: 'acct:john.smith@smith-incorporated.org',
      links: { html: 'http://smith-incorporated.org' },
      document: { title: ['Why Smith Incorporated is better than you'] },
      text: 'should not render'
    }
  ];
  const { getByText, getByRole, queryByText } = render({ data });

  getByText('dates.format_long');
  getByText('john.smith@smith-incorporated.org');
  const link = getByRole('link');
  expect(link).toHaveAttribute('href', data[0].links.html);
  getByText(data[0].document.title[0]);
  expect(queryByText(data[0].text)).not.toBeInTheDocument();
});

test('renders `item.text` if there is no document title', () => {
  const data = [{ id: '1', text: 'should not render' }];
  const { getByText } = render({ data });

  getByText(data[0].text);
});
