import React from 'react';
import { PlataformsSales } from '../types';
import { useHistory } from "react-router-dom";
import { useSalesProvider } from '../providers/SalesProvider';

import countTotalSold from '../utils/countTotalSold';
import countGenres from '../utils/countUniqueGenres';
import countSalesByPlatform from '../utils/countSalesByPlatform';
import SalesByPlatform from '../components/SalesByPlatform';

const Sales: React.FC = () => {
  const history = useHistory();
  const {state} = useSalesProvider();
  const sales = state.sales;

  const totalSold = countTotalSold(sales);
  const genres = countGenres(sales);
  let plataformsSales = countSalesByPlatform(sales, 'globalSales');
  const totalPlatforms = Object.keys(plataformsSales).length;
  const totalGenres = Object.keys(genres).length;

  plataformsSales = Object.keys(plataformsSales)
    .sort((pA, pB) => plataformsSales[pB] - plataformsSales[pA])
    .slice(0, 10)
    .reduce((plataforms:PlataformsSales, platform) => {
      plataforms[platform] = plataformsSales[platform];

      return plataforms;
    }, {});

  const chartData = Object.keys(plataformsSales)
    .sort((pA, pB) => plataformsSales[pA] - plataformsSales[pB])
    .map((platform: string) =>({x: platform, y: plataformsSales[platform]}));

  return (
    <SalesByPlatform
      chartData={chartData}
      history={history}
      totalSold={totalSold}
      totalPlatforms={totalPlatforms}
      totalGenres={totalGenres}
    />
  )
}

export default Sales;
