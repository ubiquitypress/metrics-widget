import React from 'react';
import ReactDOM from 'react-dom';
import Widget from './widget';
import { CONFIG_SCRIPT_ID, DEFAULT_ELEMENT_ID } from './widget/consts';
import handleEventQueue from './widget/events/handle-event-queue';
import deepFind from './widget/utils/deep-find';

// Pull the config from the environment
const configEl = document.getElementById(CONFIG_SCRIPT_ID);
const config = configEl && JSON.parse(configEl.textContent);

// Process the event queue (must be done before any events are called!)
handleEventQueue();

// Render the widget
ReactDOM.render(
  <Widget config={config} />,
  document.getElementById(
    deepFind(config, 'settings.element_id') || DEFAULT_ELEMENT_ID
  )
);
