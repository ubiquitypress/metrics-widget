const getMetricsConfig = () => {
  if (global && global.metrics_config) return global.metrics_config;
  return null;
};

export default getMetricsConfig;
