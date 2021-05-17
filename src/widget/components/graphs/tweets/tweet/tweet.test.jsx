import React from 'react';
import { render as rtlRender, waitFor } from '../../../../utils/test-utils';
import Tweet from './tweet';

const render = ({ id = '1' } = {}) => {
  return { ...rtlRender(<Tweet id={id} />) };
};

test('calls `window.twttr.widgets.createTweet`', () => {
  window.twttr = {
    widgets: { createTweet: jest.fn(() => Promise.resolve()) }
  };
  const id = '123482';

  render({ id });
  waitFor(() =>
    expect(window.twttr.widgets.createTweet).toHaveBeenCalledWith(id)
  );

  window.twttr = undefined;
});
