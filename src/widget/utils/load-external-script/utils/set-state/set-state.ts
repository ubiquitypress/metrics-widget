import { State, STATE_ATTRIBUTE } from '../../types';

export const setState = (element: HTMLScriptElement, state: State) => {
  element.setAttribute(STATE_ATTRIBUTE, state);
};
