/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react'
import React from 'react';
import { useHistory } from "react-router-dom";
import { PlataformsSales } from '../types';
import { useSalesProvider } from '../providers/SalesProvider';
import PlatformsSalesGraph from './PlatformsSalesGraph';

import countTotalSold from '../utils/countTotalSold';
import countGenres from '../utils/countUniqueGenres';
import countSalesByPlatform from '../utils/countSalesByPlatform';

const SalesByPlatform: React.FC = () => {
  const {state} = useSalesProvider();
  const sales = state.sales;
  const history = useHistory();

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
    <div
      css={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '100%',
        width: '100%'
      }}
    >
      <div
        css={{
          background: '#473f49',
          color: '#ffffff',
          display: 'flex',
          justifyContent: 'center',
          fontWeight: 'bold',
          fontSize: '40px',
          textAlign: 'center',
          width: '100%',
          '@media (max-width: 809px)': {
            fontSize: '20px',
          },
        }}
      >
        <div
          css={{
            width: '33%'
          }}
        >
          <p>{Math.floor(totalSold)}</p>
          <p>Sales</p>
        </div>
        <div
          css={{
            width: '33%'
          }}
        >
          <p>{totalPlatforms}</p>
          <p>Platforms</p>
        </div>
        <div
          css={{
            width: '33%'
          }}
        >
          <p>{totalGenres}</p>
          <p>Genres</p>
        </div>
      </div>

      <div
        css={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          paddingTop: '20px',
          fontWeight: 'bold',
        }}
      >
        <p
          css={{
            textAlign: 'center',
            margin: 0,
          }}
        >
          The following graph shows the number of video games sales for the 10 most popular platforms since 1980.
        </p>
        <p
          css={{
            textAlign: 'center',
            margin: 0,
          }}
        >
          You may click on the platform bar to get more details about its sales.
        </p>
      </div>
      <div
        css={{
          paddingTop: '20px',
          width: '60%',
          '@media (max-width: 809px)': {
            width: '80%'
          }
        }}
      >
        <PlatformsSalesGraph data={chartData} onClick={(props) => history.push(`/platform/${props.datum.xName}`)}/>
      </div>
    </div>
  );
}

export default SalesByPlatform;
