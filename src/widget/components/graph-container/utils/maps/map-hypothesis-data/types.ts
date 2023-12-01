export interface HypothesisAPIResponse {
  created: string;
  document: {
    title: string[];
  };
  flagged: boolean;
  group: string;
  hidden: boolean;
  id: string;
  links: {
    html: string;
    incontext: string;
    json: string;
  };
  permissions: {
    read: string[];
    admin: string[];
    update: string[];
    delete: string[];
  };
  tags: string[];
  target: {
    source: string;
    selector: {
      type: string;
      start: number;
      end: number;
    }[];
  }[];
  text: string;
  updated: string;
  uri: string;
  user: string;
  user_info: {
    display_name: string;
  };
}
