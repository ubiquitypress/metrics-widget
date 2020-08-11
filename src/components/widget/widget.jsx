import React, { useState } from 'react';
import Navigation from '../navigation/navigation';
import styles from './widget.module.scss';
import useFetch from '../../hooks/use-fetch';

const Widget = () => {
  const [tab, setTab] = useState('downloads');
  const events = useFetch(
    'https://metrics-api.operas-eu.org/events/?filter=work_uri:info:doi:10.5334/bbc&aggregation=measure_uri'
  );

  // TODO: Add actual UI here
  if (events.loading) return <p>loading</p>;
  if (events.error) return <p>{events.error}</p>;

  return (
    <div className={styles.widget}>
      <Navigation
        events={events.data.data}
        activeType={tab}
        onItemClick={(newTab) => setTab(newTab)}
      />
    </div>
  );
};

export default Widget;
