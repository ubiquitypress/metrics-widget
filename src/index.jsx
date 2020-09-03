import React from 'react';
import moment from 'moment';
import ReactDOM from 'react-dom';
import Widget from './components/widget/widget';
import getWidgetLanguage from './utils/get-widget-language/get-widget-language';
import './styles/world-map.scss';

// TODO: better way of rendering this?
try {
  metrics_config; // make sure the variable exists; will throw an error if not
  moment.locale(getWidgetLanguage()); // set the default language for Momentjs
  ReactDOM.render(<Widget />, document.getElementById('metrics-block'));
} catch (error) {
  console.error(error);
  ReactDOM.render(
    <p>No configuration found - please check the documentation.</p>,
    document.getElementById('metrics-block')
  );
}
