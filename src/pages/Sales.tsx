import React from 'react';
import { useHistory } from "react-router-dom";
import { useSalesProvider } from '../providers/SalesProvider';
import SalesByPlatform from '../components/SalesByPlatform';

import countSalesByPlatform from '../utils/countSalesByPlatform';
import { PlataformsSales } from '../types';
import useSlider from '../hooks/useSlider';

function buildSalesByPlatformGraphData(salesByPlatform: PlataformsSales) {
  return Object.keys(salesByPlatform)
    .sort((pA, pB) => salesByPlatform[pB] - salesByPlatform[pA])
    .map((platform: string) =>({x: platform, y: salesByPlatform[platform]}))
    .slice(0,5);
}

const Sales: React.FC = () => {
  const history = useHistory();
  const { state: { sales } } = useSalesProvider();
  const { wholePeriod, period, selectPeriod } = useSlider();
  const plataformsSales = countSalesByPlatform(sales, period, 'globalSales');
  const chartData = buildSalesByPlatformGraphData(plataformsSales);
  const handleClickBar = (props:any) => history.push(`/platform/${props.datum.xName}`);

  return (
    <SalesByPlatform
      chartData={chartData}
      onChangePeriod={selectPeriod}
      onClickBar={handleClickBar}
      period={wholePeriod}
      selectedPeriod={period}
    />
  )
}

export default Sales;
