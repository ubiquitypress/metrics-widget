import React, { useState } from 'react';
import Navigation from '../navigation/navigation';
import styles from './widget.module.scss';
import Tab from '../tab/tab';

const Widget = () => {
  const [tab, setTab] = useState(null);
  const [tabLoading, setTabLoading] = useState(false);

  // When the tab begins/ends loading, this function is called
  // This prevents the user jumping between navigation menus whilst data is
  // still loading, causing data leaks and unnecessary requests
  const setTabLoadingState = state => {
    if (tabLoading !== state) setTabLoading(state);
  };

  // Toggles between navigation tabs, whilst no data is loading
  const ToggleTab = newTab => {
    if (!tabLoading) setTab(newTab === tab ? null : newTab);
  };

  return (
    <div className={styles.widget}>
      <Navigation activeType={tab} onItemClick={ToggleTab} />
      <Tab activeType={tab} onLoadingChange={setTabLoadingState} />
    </div>
  );
};

export default Widget;
