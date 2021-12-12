import React from 'react';
import PlatformSalesOverview from '../components/PlatformSalesOverview';
import { countTotalSalesByRegion } from '../utils/sales';
import countTotalSold from '../utils/countTotalSold';
import useSlider from '../hooks/useSlider';
import usePlatformSales from '../hooks/usePlatformSales';

const Platform: React.FC= () =>  {
  const { wholePeriod, period, selectPeriod } = useSlider();
  const { platformSales, platformName } = usePlatformSales(period);
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
