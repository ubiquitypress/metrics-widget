import getWidgetLanguage from './get-widget-language';

test('returns the language provided in `metrics_config`', () => {
  global.metrics_config.settings.language = 'it';
  expect(getWidgetLanguage()).toBe('it');
});

test('returns `en` by default', () => {
  global.metrics_config.settings.language = undefined;
  expect(getWidgetLanguage()).toBe('en');
});
