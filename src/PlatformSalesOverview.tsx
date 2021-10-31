import React from 'react';
import { useParams  } from "react-router-dom";
import { useSalesProvider } from './providers/SalesProvider';

const PlatformSalesOverview: React.FC= () =>  {
  const { platformName } = useParams<{platformName: string}>();
  const { state } = useSalesProvider();
  const sales = state.sales;

  let plataformTotalSold = sales
    .filter(sale => sale.Platform === platformName)
    .reduce((totalSold, sale) => {
      const totalSales = parseFloat(sale.Global_Sales);
      if(totalSales) totalSold += totalSales;

      return totalSold;
    }, 0);

  return (
    <div>
      <h3>{platformName} sales overview</h3>
      <p>{plataformTotalSold.toFixed(2)}K sales</p>
    </div>
  );
}

export default PlatformSalesOverview;
