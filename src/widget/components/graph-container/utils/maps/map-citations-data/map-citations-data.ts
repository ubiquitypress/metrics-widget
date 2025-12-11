import type { CitationRecord } from '@/components';
import type { Config, GraphData, Tab } from '@/types';

export const mapCitationsData = (
  data: GraphData,
  _tab: Tab,
  _config: Config
): { items: CitationRecord[]; total: number } => {
  // For now, use the merged array (all scopes). If needed, we can filter by graph.scopes later.
  type NameInput =
    | string
    | {
        last_name?: string;
        initial?: string;
        family?: string;
        given?: string;
        name?: string;
      };

  const formatPerson = (person: NameInput) => {
    if (typeof person === 'string') {
      return person;
    }

    const family = person.last_name || person.family;
    const given = person.initial || person.given;
    if (family && given) {
      return `${family}, ${given}`;
    }
    if (family) {
      return family;
    }
    if (person.name) {
      return person.name;
    }
    return given || '';
  };

  const formatNames = (people?: NameInput[]) => {
    if (!people || people.length === 0) {
      return '';
    }
    return people.map(formatPerson).filter(Boolean).join('; ');
  };

  const items: CitationRecord[] = data.merged.map(entry => {
    // entry is APIEvent; the citation-specific fields are in event data payload
    // We expect the server to return fields directly; fallback to parsing event payload if necessary.
    const citation = entry as unknown as Partial<{
      authors: NameInput[];
      editors: NameInput[];
      year: number;
      title: string;
      source: string;
      volume: string | null;
      issue: string | null;
      page: string | null;
      doi: string | null;
      url: string | null;
      type: string | null;
    }>;

    return {
      title: citation.title || '',
      authors: formatNames(citation.authors),
      editors: formatNames(citation.editors),
      year: citation.year,
      source: citation.source || undefined,
      volume: citation.volume,
      issue: citation.issue,
      page: citation.page,
      doi: citation.doi,
      url: citation.url,
      type: citation.type
    };
  });

  return {
    items,
    total: data.total || (items.length > 0 ? items.length : 0)
  };
};
