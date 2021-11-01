import React from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react'
import GraphContainer from "../GraphContainer";
import { SalesInfo, PlataformsSales } from '../../types';
import DesktopPie from "./DesktopPie";
import MobilePie from "./MobilePie";

type SalesByRegionProps = {
  sales: SalesInfo[],
  platformName: string,
}

export type PieProps = {
  totalSoldByRegion: PlataformsSales,
}

function isMobile() {
  return /Android|iPhone/i.test(navigator.userAgent)
}

const SalesByRegion: React.FC<SalesByRegionProps>= ({ sales, platformName }) =>  {
  let totalSoldByRegion = sales
    .filter(sale => sale.Platform === platformName)
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

  return (
    <GraphContainer
      css={{
        height: '300px',
        width: '500px',
        maxWidth: '100%',
      }}
      subtitle="Sales by region"
    >
      {isMobile() ?
        <MobilePie totalSoldByRegion={totalSoldByRegion} />:
        <DesktopPie totalSoldByRegion={totalSoldByRegion} />
      }
    </GraphContainer>
  );
}

export default SalesByRegion;
