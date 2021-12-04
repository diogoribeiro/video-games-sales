import { useReducer, useCallback } from "react";
import { Sale } from '../types';
import clone from '../utils/clone';
import csvToJson from '../utils/csvToJson';

type AppState = {
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

function reducer(state: AppState, action: Action) {
  const nextState = clone(state);

  switch(action.type) {
    case ActionType.LOAD_SALES_SUCCESS:
      nextState.sales = action.payload.sales;
      nextState.loading = false;
      return nextState;
    default:
      return state;
  }
}

function useStore() {
  const [state, dispatch] = useReducer(reducer, { sales: [] });

  const actions = {
    loadSales:  useCallback(async () => {
      const response = await fetch('https://raw.githubusercontent.com/diogoribeiro/datasets/main/video-game-sales.csv');
      const csv = await response.text();
      const sales:Sale[] = csvToJson(csv);

      dispatch({type: ActionType.LOAD_SALES_SUCCESS, payload: { sales } });
    }, []),
  };

  return {
    state,
    dispatch,
    actions,
  }
}

export default useStore;