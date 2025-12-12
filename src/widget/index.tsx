import { NavigationProvider } from './components';
import { ConfigProvider } from './config';
import type { EventsMap } from './events';
import { EventsProvider } from './events';
import { IntlProvider } from './i18n';
import type { UserConfig } from './types';
import { Widget } from './widget';

interface MainProps {
  config: UserConfig;
  events?: Partial<EventsMap>;
}

// This component is the entry point for the React widget,
// simply initialising all the providers and passing the config
export const Main = (props: MainProps) => {
  const { config, events } = props;

  return (
    <ConfigProvider config={config}>
      <EventsProvider initialEvents={events}>
        <IntlProvider>
          <NavigationProvider>
            <Widget />
          </NavigationProvider>
        </IntlProvider>
      </EventsProvider>
    </ConfigProvider>
  );
};
