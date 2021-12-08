import { AppState } from '../types';

function clone(state: AppState) {
  return JSON.parse(JSON.stringify(state))
}

export default clone;