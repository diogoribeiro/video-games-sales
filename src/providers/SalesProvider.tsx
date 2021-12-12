import { createContext, useContext, Dispatch } from "react";
import { AppState } from "../types";

enum ActionType {
  LOAD_SALES,
  LOAD_SALES_SUCCESS,
}

type Action = {
  type: ActionType | undefined;
  payload: AppState;
};

type ContextType = {
  state: AppState;
  dispatch: Dispatch<Action>;
  actions: {
    loadSales: () => Promise<void>;
    selectPeriod: (period: number[]) => void;
  };
};

const Context = createContext<ContextType>({
  state: { sales: [], salesPeriod: null },
  dispatch: () => {},
  actions: {
    loadSales: () => Promise.reject("Invalid load sales action"),
    selectPeriod: () => {
      throw new Error("Invalid select period action");
    },
  },
});
const Provider = Context.Provider;

function useSalesProvider() {
  const context = useContext(Context);

  if (!context) {
    throw new Error(
      "The component cannot be rendered outside the SalesProvider"
    );
  }

  return context;
}

export { Provider as SalesProvider, Context as SalesContext, useSalesProvider };
