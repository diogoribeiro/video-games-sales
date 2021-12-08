import React from 'react';
import { useParams  } from "react-router-dom";
import { useSalesProvider } from '../providers/SalesProvider';
import PlatformSalesOverview from '../components/PlatformSalesOverview';
import { RegionsSales } from '../types';
import uniqueSalesYears from '../utils/uniqueSalesYears';

const Platform: React.FC= () =>  {
  const { platformName } = useParams<{platformName: string}>();
  const {
    state: { sales, salesPeriod },
    actions: { selectPeriod },
  } = useSalesProvider();
  const years = uniqueSalesYears(sales);
  const wholePeriod = {begin: years[0], end: years[years.length - 1]};
  const period = salesPeriod || wholePeriod;

  const platformSales = sales.filter(sale => sale.platform === platformName &&
    sale.releaseYear >= period.begin &&
    sale.releaseYear <= period.end
  )

  const totalSoldByPlatform = platformSales
    .reduce((total, sale) => {
      total += sale.globalSales || 0;

      return total;
    }, 0);

  const totalSoldByRegion = platformSales
    .reduce((plataforms: RegionsSales, sale) => {
      plataforms.eu += sale.euSales || 0;
      plataforms.northAmerica += sale.naSales || 0;
      plataforms.japan += sale.jpSales || 0;
      plataforms.others += sale.otherSales || 0;

      return plataforms;
    }, {
      eu: 0,
      northAmerica: 0,
      japan: 0,
      others: 0,
    });

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
