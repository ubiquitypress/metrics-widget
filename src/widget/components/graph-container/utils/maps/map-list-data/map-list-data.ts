import { ListData } from '@/components';
import { GraphData, List } from '@/types';

export const mapListData = (data: GraphData, graph: List): ListData[] => {
  const { name_regex, name_replacements } = graph.config || {};
  const map: ListData[] = [];

  data.merged.forEach(event => {
    if (event.event_uri == null) return;

    // Get the name based on the regex
    let name = event.event_uri;
    if (name_regex) {
      const regex = new RegExp(name_regex);
      const match = event.event_uri.match(regex);
      if (match) {
        // Set the name
        name = match[match.length - 1];

        // Decode the name
        name = decodeURIComponent(name);

        // Replace the name
        if (name_replacements) {
          Object.entries(name_replacements).forEach(([key, value]) => {
            name = name.replaceAll(key, value);
          });
        }
      }
    }

    // Add the event to the map
    map.push({
      id: event.event_id,
      name,
      link: event.event_uri
    });
  });

  return map;
};
