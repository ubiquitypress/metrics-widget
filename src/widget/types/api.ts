export interface APIAggregation {
  measure_uri: string;
  namespace: string;
  source: string;
  type: string;
  version: string;
  value: number;
}

export interface APIEvent {
  country_uri: string | null;
  event_id: string;
  event_uri: string | null;
  measure_uri: string;
  timestamp: string;
  uploader_uri: string;
  value: number;
  work_uri: string;
}
