import React from 'react';
import PropTypes from 'prop-types';
import widgetEvent from './events/widget-event';
import ConfigProvider from './contexts/config';
import Widget from './components/widget';
import MetricsProvider from './contexts/metrics';
import I18nProvider from './contexts/i18n';
import { configPropTypes } from './proptypes';
import './polyfills';

const Main = ({ config }) => {
  // No configuration found - throw a gentle error
  if (!config)
    return <p>No configuration found - please check the documentation.</p>;

  // Call the `widget_loading` event
  widgetEvent('widget_loading');

  return (
    <ConfigProvider config={config}>
      <MetricsProvider>
        <I18nProvider>
          <Widget />
        </I18nProvider>
      </MetricsProvider>
    </ConfigProvider>
  );
};

Main.propTypes = {
  config: PropTypes.shape(configPropTypes)
};
Main.defaultProps = {
  config: undefined
};

export default Main;
