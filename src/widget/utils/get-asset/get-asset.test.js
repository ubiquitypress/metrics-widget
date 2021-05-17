import getAsset from './get-asset';

const ENV = process.env;
beforeEach(() => {
  jest.resetModules();
  process.env = { ...ENV };
});
afterAll(() => {
  process.env = { ...ENV };
});

test('returns root path if on development environment', () => {
  process.env.NODE_ENV = 'development';

  expect(getAsset('name.json')).toBe('/assets/name.json');
});

test('returns full path if not on development environment', () => {
  process.env.NODE_ENV = 'production';

  expect(getAsset('name.json')).toBe(
    'https://storage.googleapis.com/operas/metrics-widget-0.1.4/assets/name.json'
  );
});
