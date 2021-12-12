import React from 'react';
import { useParams  } from "react-router-dom";
import { useSalesProvider } from '../providers/SalesProvider';
import PlatformSalesOverview from '../components/PlatformSalesOverview';
import { countTotalSalesByRegion, getPlatformSalesByPeriod } from '../utils/sales';
import countTotalSold from '../utils/countTotalSold';
import useSlider from '../hooks/useSlider';

const Platform: React.FC= () =>  {
  const { platformName } = useParams<{platformName: string}>();
  const { state: { sales } } = useSalesProvider();
  const { wholePeriod, period, selectPeriod } = useSlider();
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
