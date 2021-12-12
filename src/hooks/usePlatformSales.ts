import { useParams } from "react-router-dom";
import { useSalesProvider } from "../providers/SalesProvider";
import { Period } from "../types";
import { getPlatformSalesByPeriod } from "../utils/sales";

function usePlatformSales(period: Period) {
  const { platformName } = useParams<{platformName: string}>();
  const { state: { sales } } = useSalesProvider();
  const platformSales = getPlatformSalesByPeriod(sales, platformName, period);

  return { platformSales, platformName };
}

export default usePlatformSales;