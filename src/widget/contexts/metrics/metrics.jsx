import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useConfig } from '../config';

const MetricsContext = createContext({});

const MetricsProvider = ({ children }) => {
  const config = useConfig();
  const [metricsData] = useState({});

  // Function to fetch metric data
  const fetchMetric = async measure => {
    try {
      // We already have the data, so just return that
      if (metricsData[measure]) return metricsData[measure];

      // Get the data from the API
      const url = `${config.settings.base_url}?filter=work_uri:${config.settings.work_uri}${measure}`;
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
  children: PropTypes.node.isRequired
};

export default MetricsProvider;
