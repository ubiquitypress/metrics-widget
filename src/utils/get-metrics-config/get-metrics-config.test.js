import getMetricsConfig from './get-metrics-config';

test('returns correct config if provided', () => {
  expect(getMetricsConfig()).toStrictEqual(global.metrics_config);
});

test('returns null if there is no config', () => {
  global.metrics_config = undefined;
  expect(getMetricsConfig()).toStrictEqual(null);
});
