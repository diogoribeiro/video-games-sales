import { useSalesProvider } from '../providers/SalesProvider';
import { uniqueSalesYears } from "../utils/sales";

function useSlider() {
  const {
    state: { sales, salesPeriod },
    actions: { selectPeriod },
  } = useSalesProvider();

  const years = uniqueSalesYears(sales);
  const wholePeriod = {begin: years[0], end: years[years.length - 1]};
  const period = salesPeriod || wholePeriod;

  return { wholePeriod, period, selectPeriod };
}

export default useSlider;