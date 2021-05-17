import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { configPropTypes } from '../../proptypes';

const MetricsContext = createContext({});

const MetricsProvider = ({ config, children }) => {
  const [_config] = useState(config);
  const [metricsData] = useState({});

  // Function to fetch metric data
  const fetchMetric = async measure => {
    try {
      // We already have the data, so just return that
      if (metricsData[measure]) return metricsData[measure];

      // Get the data from the API
      const url = `${_config.settings.base_url}?filter=work_uri:${_config.settings.work_uri}${measure}`;
      const res = await fetch(url);
      const { data } = await res.json();

      // Store the response for future use
      metricsData[measure] = data;

      // Return the data
      return Promise.resolve(data);
    } catch (err) {
      // TODO: Format this error
      return Promise.reject(err);
    }
  };

  return (
    <MetricsContext.Provider value={{ fetchMetric }}>
      {children}
    </MetricsContext.Provider>
  );
};

export const useMetrics = () => useContext(MetricsContext);

MetricsProvider.propTypes = {
  config: PropTypes.shape(configPropTypes).isRequired,
  children: PropTypes.node.isRequired
};

export default MetricsProvider;
