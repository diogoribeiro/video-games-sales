import React from 'react';
import { useParams  } from "react-router-dom";
import { useSalesProvider } from '../providers/SalesProvider';
import PlatformSalesOverview from '../components/PlatformSalesOverview';

const Platform: React.FC= () =>  {
  const { platformName } = useParams<{platformName: string}>();
  const { state: { sales } } = useSalesProvider();

  const platformSales = sales.filter(sale => sale.platform === platformName)

  const totalSoldByPlatform = platformSales
    .reduce((total, sale) => {
      total += sale.globalSales || 0;

      return total;
    }, 0);

  return (
    <PlatformSalesOverview
      platformName={platformName}
      platformSales={platformSales}
      totalSoldByPlatform={totalSoldByPlatform}
    />
  );
}

export default Platform;
