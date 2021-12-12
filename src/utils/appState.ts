import { AppState } from '../types';

export function clone(state: AppState) {
  return JSON.parse(JSON.stringify(state))
}
