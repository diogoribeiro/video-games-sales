import React from "react";
import { SalesSummary, PlataformsSales } from '../../types';
import PercentageGraph from "./PercentageGraph";
import findMostSalesRegion from "../../utils/findMostSalesRegion";
import styles from './SalesByRegion.module.css';

const SalesByRegion: React.FC<SalesSummary>= ({ sales, totalSold }) =>  {
  const totalSoldByRegion = sales
    .reduce((plataforms:PlataformsSales, sale) => {
      plataforms['EU'] += sale.euSales || 0;
      plataforms['North America'] += sale.naSales || 0;
      plataforms['Japan'] += sale.jpSales || 0;
      plataforms['Others'] += sale.otherSales || 0;

      return plataforms;
    }, {
      'EU': 0,
      'North America': 0,
      'Japan': 0,
      'Others': 0,
    });

  const mostSaleRegionInfo = findMostSalesRegion(totalSoldByRegion, totalSold);

  const regionsSummary = Object.keys(totalSoldByRegion)
    .filter(region => (region !== mostSaleRegionInfo.region))
    .map(region => (
      <div key={region}>
        <span className={styles['region-name']}>
          {region}:
        </span>
        <span className={styles['region-total']}>
          { ((totalSoldByRegion[region]/totalSold) * 100).toFixed(2) }%
        </span>
      </div>
    ));

  return (
    <div className={styles.container}>
      <PercentageGraph
        color="#FAA85D"
        percentageInfo={{
          label: `${mostSaleRegionInfo.percentage.toFixed(2)}%\n sales in ${mostSaleRegionInfo.region}`,
          percentage: mostSaleRegionInfo.percentage,
          total: mostSaleRegionInfo.totalSold,
        }}
      />
      {regionsSummary}
    </div>
  );
}

export default SalesByRegion;
