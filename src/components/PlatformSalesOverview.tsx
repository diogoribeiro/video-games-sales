import React from 'react';
import { Link } from 'react-router-dom';
import { Sale } from "../types";

import SalesByRegion from './SalesByRegion';
import GenreSalesSummary from './GenreSalesSummary'

/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react'

type Props = {
  totalSoldByPlatform: number,
  platformName: string,
  platformSales: Sale[],
}
const PlatformSalesOverview: React.FC<Props>= ({ totalSoldByPlatform, platformName, platformSales }) =>  {
  return (
    <div css={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    }}>
      <div
        css={{
          alignItems: 'center',
          display: 'flex',
        }}
      >
        <h3
          css={{
            color: '#f9b3a0',
            flexGrow: 1,
            fontSize: '30px',
            margin: '0',
            paddingTop: '20px',
            '@media (max-width: 809px)': {
              fontSize: '24px',
            }
          }}
        >
          {platformName} sales overview
        </h3>
        <Link
          css={{
            color: '#473f49',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '20px',
            padding: '20px 20px 0 0'
          }}
          to="/"
        >
          X
        </Link>
      </div>
      <div
        css={{
          textAlign: 'center'
        }}
      >
        <p>
          {platformName} sold {Math.floor(totalSoldByPlatform)} video games across the globe since {Math.min(...platformSales.map(sale => sale.releaseYear || new Date().getFullYear()))}
        </p>
        <p>
          Here is how it was distributed by region and genre.
        </p>
      </div>
      <div css={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-evenly',
        '@media (max-width: 809px)': {
          flexDirection: 'column',
        }
      }}>
        <SalesByRegion sales={platformSales} totalSold={totalSoldByPlatform} />
        <div css={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          width: '50%',
          '@media (max-width: 809px)': {
            width: '100%',
          }
        }}>
          <GenreSalesSummary sales={platformSales} totalSold={totalSoldByPlatform} />
        </div>
      </div>
    </div>
  );
}

export default PlatformSalesOverview;
