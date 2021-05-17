import React from 'react';
import ReactDOM from 'react-dom';
import Widget from './widget';

// Pull the config from the environment
// eslint-disable-next-line no-undef
const config = metrics_config || window.metrics_config;

// Render the widget
ReactDOM.render(
  <Widget config={config} />,
  document.getElementById('metrics-block')
);
