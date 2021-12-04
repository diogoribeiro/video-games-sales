import { createContext, useContext, Dispatch } from "react";
import { Sale } from '../types';

type AppState = {
  loading?: boolean,
  sales: Sale[]
};

enum ActionType {
  LOAD_SALES,
  LOAD_SALES_SUCCESS,
}

type Action = {
  type: ActionType | undefined,
  payload: Required<AppState>,
}

const Context = createContext<{state: AppState, dispatch: Dispatch<Action>, actions: {[key: string]: () => {}}}>({ state: { sales: [] }, dispatch: () => {}, actions: {} });
const Provider = Context.Provider;


function useSalesProvider() {
  const context = useContext(Context);

  if(!context) throw new Error('The component cannot be rendered outside the SalesProvider');

  return context;
}

export {Provider as SalesProvider, Context as SalesContext, useSalesProvider};