import { WINDOW_WIDGET_NAME } from '../../consts';

const widgetEvent = (name, params) => {
  const widgetName = WINDOW_WIDGET_NAME;
  const { events } = window[widgetName];

  // Make sure the event is bound / has subscribers
  if (events && events.on && events.on[name]) {
    const subscribers = events.on[name];
    subscribers.forEach(subscriber => subscriber(params));
  }
};

export default widgetEvent;
