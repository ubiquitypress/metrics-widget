import { WINDOW_WIDGET_NAME } from '../../consts';

// Runs through the event queue created before the widget was loaded, moving all
// subscribed events into `window[widgetName].events.on`
const handleEventQueue = () => {
  const widgetName = WINDOW_WIDGET_NAME;
  const { eventQueue } = window[widgetName];

  // Replace the widget with our new bindable events now that we've extracted the queue
  window[widgetName].events = {
    on: {},
    subscribe: (event, f) => {
      if (!window[widgetName].events.on[event])
        window[widgetName].events.on[event] = [];
      window[widgetName].events.on[event].push(f);
    },
    unsubscribe: (event, f) => {
      if (window[widgetName].events.on[event]) {
        window[widgetName].events.on[event] = window[widgetName].events.on[
          event
        ].filter(item => item.toString() !== f.toString());
      }
    }
  };

  // Run through each item in the queue
  eventQueue.forEach(item => {
    item(window[widgetName]);
  });
};

export default handleEventQueue;
