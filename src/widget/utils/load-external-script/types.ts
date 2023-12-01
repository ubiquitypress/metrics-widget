export const STATE_ATTRIBUTE = 'data-state';

export type State = 'loading' | 'loaded';

export const StateMap: Record<State, string> = {
  loading: 'loading',
  loaded: 'loaded'
};
