import React from 'react';
import { useParams  } from "react-router-dom";
import { useSalesProvider } from '../providers/SalesProvider';
import PlatformSalesOverview from '../components/PlatformSalesOverview';
import { RegionsSales } from '../types';

const Platform: React.FC= () =>  {
  const { platformName } = useParams<{platformName: string}>();
  const { state: { sales } } = useSalesProvider();

  const platformSales = sales.filter(sale => sale.platform === platformName)

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
    />
  );
}

export default Platform;
