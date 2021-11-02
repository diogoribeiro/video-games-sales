import React from "react";
import { SalesSummary, PlataformsSales } from '../types';
import PercentageGraph from "./PercentageGraph";
import findMostSalesRegion from "../utils/findMostSalesRegion";

/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react'

const SalesByRegion: React.FC<SalesSummary>= ({ sales, totalSold }) =>  {
  const totalSoldByRegion = sales
    .reduce((plataforms:PlataformsSales, sale) => {
      plataforms['EU'] += parseFloat(sale.EU_Sales) || 0;
      plataforms['North America'] += parseFloat(sale.NA_Sales) || 0;
      plataforms['Japan'] += parseFloat(sale.JP_Sales) || 0;
      plataforms['Others'] += parseFloat(sale.Other_Sales) || 0;

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
        <span
          css={{
            fontWeight: 'bold',
            fontSize: '16px',
            marginRight: '5px',
          }}
        >
          {region}:
        </span>
        <span
          css={{
            fontSize: '16px',
          }}
        >
          { ((totalSoldByRegion[region]/totalSold) * 100).toFixed(2) }%
        </span>
      </div>
    ));

  return (
    <div
      css={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
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
