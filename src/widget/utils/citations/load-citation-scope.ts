import type { APIResponse } from '@/components/graph-container/utils/loaders/load-data/types';
import type { Config, Scope } from '@/types';
import { HTTPRequest } from '@/utils/http-request';
import { log } from '@/utils/log';

const EVENTS_ENDPOINT_REGEX = /\/events$/;

interface CitationScopeResult {
  total: number;
  data: APIResponse['data'];
}

/**
 * Fetch citations for a given scope and return filtered events plus total count.
 * @param filteredWorks - List of work URIs (already filtered for truthy values).
 * @param scope - Scope containing date filters.
 * @param config - Widget configuration.
 */
export const loadCitationScope = async (
  filteredWorks: string[],
  scope: Scope,
  config: Config
): Promise<CitationScopeResult> => {
  if (filteredWorks.length === 0) {
    return { total: 0, data: [] };
  }

  const query = filteredWorks
    .map(work => `work_uri=${encodeURIComponent(work)}`)
    .join('&');

  const citationsUrl =
    config.settings.citations_url ||
    config.settings.base_url.replace(EVENTS_ENDPOINT_REGEX, '/citations');

  try {
    const res = await HTTPRequest<APIResponse>({
      method: 'GET',
      url: `${citationsUrl}?${query}`
    });

    const filtered = (res.data || []).filter(event => {
      const startDate = scope.startDate;
      const endDate = scope.endDate;
      if (
        startDate &&
        event.timestamp &&
        new Date(event.timestamp) < new Date(startDate)
      ) {
        return false;
      }
      if (
        endDate &&
        event.timestamp &&
        new Date(event.timestamp) >= new Date(endDate)
      ) {
        return false;
      }
      return true;
    });

    const total = filtered.reduce((sum, event) => sum + (event.value ?? 1), 0);

    return {
      total,
      data: filtered
    };
  } catch (err) {
    log.warn('Could not fetch citation data', err);
    return { total: 0, data: [] };
  }
};
