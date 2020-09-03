import getMetricsConfig from '../get-metrics-config/get-metrics-config';

const getWidgetLanguage = () => {
  const metricsConfig = getMetricsConfig();

  // If a language is defined in `metrics_config`
  if (
    metricsConfig &&
    metricsConfig.settings &&
    metricsConfig.settings.language
  )
    return metricsConfig.settings.language;

  // Return English by default
  return 'en';
};

export default getWidgetLanguage;
