import getVersion from './get-version';

jest.mock('../../../config.json', () => ({
  app_version: '1.12.29'
}));
afterAll(() => {
  jest.clearAllMocks();
});

test('returns current app version', () => {
  expect(getVersion()).toEqual('1.12.29');
});
