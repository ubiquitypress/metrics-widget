import getString from './get-string';

jest.mock('../en.json', () => ({
  conversations: {
    greetings: {
      greeting1: 'hello',
      greeting2: 'good day',
      greeting3: 'hi, {{name}}'
    },
    farewells: {
      farewell1: 'goodbye',
      farewell2: 'bye, {{name}}!'
    },
    weather: "it's really {{weather}} today!"
  }
}));

test('returns the correct phrase at the specified path', () => {
  let str = '';

  str = getString('conversations.greetings.greeting1', {}, 'en');
  expect(str).toBe('hello');

  str = getString('conversations.greetings.greeting2', {}, 'en');
  expect(str).toBe('good day');

  str = getString('conversations.farewells.farewell1', {}, 'en');
  expect(str).toBe('goodbye');
});

test('returns the correct interpolated phrase at the specified path', () => {
  let str = '';

  str = getString('conversations.greetings.greeting3', { name: 'John' }, 'en');
  expect(str).toBe('hi, John');

  str = getString('conversations.farewells.farewell2', { name: 'Smith' }, 'en');
  expect(str).toBe('bye, Smith!');

  str = getString('conversations.weather', { weather: 'sunny' }, 'en');
  expect(str).toBe("it's really sunny today!");
});

test('returns original path if phrase is not found', () => {
  let str = '';

  str = getString('not.found.at.all', {}, 'en');
  expect(str).toBe('not.found.at.all');

  str = getString('conversations.greetings.farewell', {}, 'en');
  expect(str).toBe('conversations.greetings.farewell');

  str = getString('conversations.greetings.farewell', { not: 'real' }, 'en');
  expect(str).toBe('conversations.greetings.farewell');
});

test.todo('returns correct phrase in the specified language');
