import { useReducer, useCallback } from "react";
import { AppState, Sale } from '../types';
import clone from '../utils/clone';
import csvToJson from '../utils/csvToJson';

enum ActionType {
  LOAD_SALES,
  LOAD_SALES_SUCCESS,
  SELECT_PERIOD,
}

type Action = {
  type: ActionType | undefined,
  payload: Partial<AppState>,
}

function reducer(state: AppState, action: Action) {
  const nextState = clone(state);

  switch(action.type) {
    case ActionType.LOAD_SALES_SUCCESS:
      nextState.sales = action.payload.sales;
      nextState.loading = false;
      return nextState;
    case ActionType.SELECT_PERIOD:
      nextState.salesPeriod = action.payload.salesPeriod;
      return nextState;
    default:
      return state;
  }
}

function useStore() {
  const [state, dispatch] = useReducer(reducer, { sales: [], salesPeriod: null });

  const actions = {
    loadSales:  useCallback(async () => {
      const response = await fetch('https://raw.githubusercontent.com/diogoribeiro/datasets/main/video-game-sales.csv');
      const csv = await response.text();
      const sales:Sale[] = csvToJson(csv);

      dispatch({type: ActionType.LOAD_SALES_SUCCESS, payload: { sales } });
    }, []),
    selectPeriod: function (period:number[]) {
      dispatch({type: ActionType.SELECT_PERIOD, payload: { salesPeriod: { begin: period[0], end: period[1]} } })
    },
  };

  return {
    state,
    dispatch,
    actions,
  }
}

export default useStore;