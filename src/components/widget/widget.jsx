import React, { useState } from 'react';
import Navigation from '../navigation/navigation';
import styles from './widget.module.scss';
import Tab from '../tab/tab';
import getMetricsConfig from '../../utils/get-metrics-config/get-metrics-config';

const Widget = () => {
  const [tab, setTab] = useState(null);
  const [tabLoading, setTabLoading] = useState(false);

  // When all nav items are loaded, let's try to open a tab
  // based on what is provided in the settings.
  const onNavItemsLoaded = (items = []) => {
    const { default_tabs } = getMetricsConfig().settings;
    if (default_tabs && Array.isArray(default_tabs))
      for (let i = 0; i < default_tabs.length; i += 1)
        if (items.includes(default_tabs[i])) return setTab(default_tabs[i]);
    return null;
  };

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
      <Navigation
        activeType={tab}
        onItemClick={ToggleTab}
        onNavItemsLoad={onNavItemsLoaded}
      />
      {tab && <Tab activeType={tab} onLoadingChange={setTabLoadingState} />}
    </div>
  );
};

export default Widget;
