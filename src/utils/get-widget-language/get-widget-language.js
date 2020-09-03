const getWidgetLanguage = () => {
  // If a language is defined in `metrics_config`
  if (
    metrics_config &&
    metrics_config.settings &&
    metrics_config.settings.language
  )
    return metrics_config.settings.language;

  // Return English by default
  return 'en';
};

export default getWidgetLanguage;
