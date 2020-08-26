import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import WorldMap from '../cards/world-map/world-map';
import TimeGraph from '../cards/time-graph/time-graph';
import CountryTable from '../cards/country-table/country-table';
import WikipediaArticles from '../cards/wikipedia-articles/wikipedia-articles';

const Tab = ({ activeType, onLoadingChange }) => {
  const [graphs, setGraphs] = useState({});
  const [loading, setLoading] = useState({
    isLoading: false,
    childrenLength: 0,
    childrenLoaded: 0
  });

  // Called when a child loads
  const onChildLoad = () => {
    setLoading(prevState => ({
      ...prevState,
      childrenLoaded: prevState.childrenLoaded + 1
    }));
  };

  useEffect(() => {
    if (
      loading.isLoading &&
      (loading.childrenLength === 0 ||
        loading.childrenLoaded === loading.childrenLength)
    )
      setLoading({ ...loading, isLoading: false });

    // if (
    //   loading.isLoading &&
    //   (loading.childrenLength === 0 ||
    //     loading.childrenLoaded === loading.childrenLength)
    // )
    //   setLoading({ ...loading, isLoading: false });

    // Tell the parent <Widget /> that we are [not] loading
    onLoadingChange(loading.isLoading);
  }, [loading]);

  // Only re-calculate data when the activeType is changed
  useEffect(() => {
    // No data if we toggle it closed
    if (!activeType) return setGraphs({});

    // Pull the configs from the `metrics_config`
    const graphs = metrics_config.tabs[activeType].graphs;

    // Set the graphs in the object
    setGraphs(graphs);

    // Update the loading state
    setLoading({
      ...loading,
      isLoading: true,
      childrenLength: Object.keys(graphs).length,
      childrenLoaded: 0
    });
  }, [activeType]);

  // Make sure we have some graphs to render
  if (Object.keys(graphs).length > 0)
    return (
      <div>
        {loading.isLoading && <p>Loading this data...</p>}
        {Object.keys(graphs).map(name => {
          const uris = graphs[name];

          // Update this whenever new cards are added
          switch (name) {
            case 'world_map':
              return (
                <WorldMap
                  key={name}
                  uris={uris}
                  activeType={activeType}
                  onReady={onChildLoad}
                  hidden={loading.isLoading}
                />
              );
            case 'time_graph':
              return (
                <TimeGraph
                  key={name}
                  uris={uris}
                  activeType={activeType}
                  onReady={onChildLoad}
                  hidden={loading.isLoading}
                />
              );
            case 'country_table':
              return (
                <CountryTable
                  key={name}
                  uris={uris}
                  activeType={activeType}
                  onReady={onChildLoad}
                  hidden={loading.isLoading}
                />
              );
            case 'wikipedia_articles':
              return (
                <WikipediaArticles
                  key={name}
                  uris={uris}
                  onReady={onChildLoad}
                  hidden={loading.isLoading}
                />
              );
          }

          // No matching cards are found
          return null;
        })}
      </div>
    );

  // There is no graph data to display
  return <p>No data to display.</p>; // TODO: display something else?
};

Tab.propTypes = {
  activeType: PropTypes.string,
  onLoadingChange: PropTypes.func
};

export default Tab;
