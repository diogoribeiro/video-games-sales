import React from 'react';
import { useHistory } from "react-router-dom";
import { useSalesProvider } from '../providers/SalesProvider';
import SalesByPlatform from '../components/SalesByPlatform';

import countSalesByPlatform from '../utils/countSalesByPlatform';
import unique from '../utils/unique';

const Sales: React.FC = () => {
  const history = useHistory();
  const {
    state: { sales, salesPeriod },
    actions: { selectPeriod },
  } = useSalesProvider();

  const years = unique(sales.map(sale => sale.releaseYear).filter(releaseYear => (releaseYear && releaseYear >= 1980))).sort();
  const wholePeriod = {begin: years[0], end: years[years.length - 1]};
  const period = salesPeriod || wholePeriod;
  const plataformsSales = countSalesByPlatform(sales, period, 'globalSales');

  const chartData = Object.keys(plataformsSales)
    .sort((pA, pB) => plataformsSales[pB] - plataformsSales[pA])
    .map((platform: string) =>({x: platform, y: plataformsSales[platform]}))
    .slice(0,5);

  const onChangePeriod = (newPeriod:number[]) => selectPeriod({ begin: newPeriod[0], end: newPeriod[1]});

  return (
    <SalesByPlatform
      chartData={chartData}
      history={history}
      onChangePeriod={onChangePeriod}
      period={wholePeriod}
      selectedPeriod={period}
    />
  )
}

export default Sales;
