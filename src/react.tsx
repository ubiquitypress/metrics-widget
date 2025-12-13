import type React from 'react';
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
  id?: string;
  className?: string;
  containerRef?: React.Ref<HTMLDivElement>;
}

/**
 * React entrypoint for the metrics widget. Pass a UserConfig and handle the rest as a normal React component.
 */
export const MetricsWidget = ({
  config,
  events,
  id = 'metrics-widget',
  className,
  containerRef
}: MetricsWidgetProps) => (
  <div id={id} className={className} ref={containerRef}>
    <Main config={config} events={events} />
  </div>
);

export type { UserConfig, Config, Graph, Graphs, Scope, Tab };
