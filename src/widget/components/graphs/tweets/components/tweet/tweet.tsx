import { Graph } from '@/types';
import { cx } from '@/utils';
import React, { useEffect } from 'react';
import styles from './tweet.module.scss';

interface TweetProps {
  id: string;
  graphId: Graph['id'];
  hidden?: boolean;
}

export const Tweet = (props: TweetProps) => {
  const { id, graphId, hidden } = props;
  const elId = `${graphId}-tweet-${id}`;

  useEffect(() => {
    const el = document.getElementById(elId);
    if (!el) return;

    // Load the tweet
    window.twttr.widgets.createTweet(id, el);
  }, []);

  return <div id={elId} className={cx(styles['twitter-tweet'], { hidden })} />;
};
