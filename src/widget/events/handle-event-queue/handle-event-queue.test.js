import { WINDOW_WIDGET_NAME } from '../../consts';
import handleEventQueue from './handle-event-queue';

test('calls all items in the event queue', () => {
  const eventA = jest.fn();
  const eventB = jest.fn();
  const eventQueue = [eventA, eventB];

  // create the mock object
  window[WINDOW_WIDGET_NAME] = { eventQueue };

  // handle the event queue
  handleEventQueue();

  // check for the events to have been called
  eventQueue.forEach(item => {
    expect(item).toHaveBeenCalledTimes(1);
  });
});

test('subscribe event pushes items into the `on` object', () => {
  const func = jest.fn();
  const eventName = 'custom_event_name_123';

  // create the mock object
  window[WINDOW_WIDGET_NAME] = {
    eventQueue: [
      () => window[WINDOW_WIDGET_NAME].events.subscribe(eventName, func)
    ]
  };

  // handle the queue
  handleEventQueue();

  // expect to exist in `on`
  expect(window[WINDOW_WIDGET_NAME].events.on[eventName].length).toBe(1);
});
