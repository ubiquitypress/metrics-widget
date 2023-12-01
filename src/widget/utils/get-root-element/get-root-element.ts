import { DEFAULT_ELEMENT_ID } from '@/config';
import { Config, UserConfig } from '@/types';

export const getRootElement = (config: UserConfig | Config) => {
  const id = config.settings?.element_id || DEFAULT_ELEMENT_ID;

  return document.getElementById(id);
};
