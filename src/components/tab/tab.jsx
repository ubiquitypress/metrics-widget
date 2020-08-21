import React, { useEffect, useState } from 'react';
import WorldMap from '../cards/world-map/world-map';
import TimeGraph from '../cards/time-graph/time-graph';
import KeyValueTable from '../graphs/key-value-table/key-value-table';
import CountryTable from '../cards/country-table/country-table';

const Tab = ({ events, activeType }) => {
  const [graphs, setGraphs] = useState({});

  // Only re-calculate data when the activeType is changed
  useEffect(() => {
    // No data if we toggle it closed
    if (!activeType) return setGraphs({});

    // Pull the configs from the `metrics_config`
    const graphs = metrics_config.tabs[activeType].graphs;

    // Set the graphs in the object
    setGraphs(graphs);
  }, [activeType]);

  // Make sure we hve some graphs to render
  if (Object.keys(graphs).length > 0)
    return (
      <div>
        {Object.keys(graphs).map(name => {
          const uris = graphs[name];

          // Update this whenever new cards are added
          switch (name) {
            case 'world_map':
              return <WorldMap key={name} uris={uris} />;
            case 'time_graph':
              return <TimeGraph key={name} uris={uris} />;
            case 'country_table':
              return <CountryTable key={name} uris={uris} />;
          }

          // No matching cards are found
          return null;
        })}
      </div>
    );
  return null;
};

export default Tab;
