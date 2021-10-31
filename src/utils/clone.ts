import { SalesInfo } from '../types';

// TODO use a more generic type
type AppState = {
  loading?: boolean,
  sales: SalesInfo[]
};

function clone(state: AppState) {
  return JSON.parse(JSON.stringify(state))
}

export default clone;