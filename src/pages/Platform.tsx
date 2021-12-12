import React from 'react';
import { useParams  } from "react-router-dom";
import { useSalesProvider } from '../providers/SalesProvider';
import PlatformSalesOverview from '../components/PlatformSalesOverview';
import uniqueSalesYears from '../utils/uniqueSalesYears';
import { countTotalSalesByRegion, getPlatformSalesByPeriod } from '../utils/sales';
import countTotalSold from '../utils/countTotalSold';

const Platform: React.FC= () =>  {
  const { platformName } = useParams<{platformName: string}>();
  const {
    state: { sales, salesPeriod },
    actions: { selectPeriod },
  } = useSalesProvider();
  const years = uniqueSalesYears(sales);
  const wholePeriod = {begin: years[0], end: years[years.length - 1]};
  const period = salesPeriod || wholePeriod;
  const platformSales = getPlatformSalesByPeriod(sales, platformName, period);
  const totalSoldByPlatform = countTotalSold(platformSales);
  const totalSoldByRegion = countTotalSalesByRegion(platformSales);

  return (
    <PlatformSalesOverview
      platformName={platformName}
      platformSales={platformSales}
      totalSoldByPlatform={totalSoldByPlatform}
      totalSoldByRegion={totalSoldByRegion}
      onChangePeriod={selectPeriod}
      period={wholePeriod}
      selectedPeriod={period}
    />
  );
}

export default Platform;
