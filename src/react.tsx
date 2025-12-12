import { Main } from './widget';
import type { EventsMap } from './widget/events';
import type {
  Config,
  Graph,
  Graphs,
  Scope,
  Tab,
  UserConfig
} from './widget/types';

export interface MetricsWidgetProps {
  config: UserConfig;
  events?: Partial<EventsMap>;
}

/**
 * React entrypoint for the metrics widget. Pass a UserConfig and handle the rest as a normal React component.
 */
export const MetricsWidget = ({ config, events }: MetricsWidgetProps) => (
  <Main config={config} events={events} />
);

export type { UserConfig, Config, Graph, Graphs, Scope, Tab };
