import { WINDOW_WIDGET_NAME } from '../../consts';
import widgetEvent from './widget-event';

test('calls the event if it exists', () => {
  const eventName = 'custom_event_123';
  const eventA = jest.fn();

  // create the mock object
  window[WINDOW_WIDGET_NAME] = {
    events: {
      on: {
        [eventName]: [eventA]
      }
    }
  };

  // call the event
  widgetEvent(eventName);

  // check if it was called
  expect(eventA).toHaveBeenCalledTimes(1);
});

test('does not call unrelated events', () => {
  const eventA = jest.fn();

  // create the mock object
  window[WINDOW_WIDGET_NAME] = {
    events: {
      on: {
        someOtherEvent: [eventA]
      }
    }
  };

  // call the event
  widgetEvent('notTheRightEvent');

  // check if it was called
  expect(eventA).not.toHaveBeenCalled();
});

test('calls the event with params', () => {
  const eventName = 'custom_event_123';
  const params = { hello: 'world' };
  const eventA = jest.fn();

  // create the mock object
  window[WINDOW_WIDGET_NAME] = {
    events: {
      on: {
        [eventName]: [eventA]
      }
    }
  };

  // call the event
  widgetEvent(eventName, params);

  // check if it was called
  expect(eventA).toHaveBeenCalledTimes(1);
  expect(eventA).toHaveBeenCalledWith(params);
});
