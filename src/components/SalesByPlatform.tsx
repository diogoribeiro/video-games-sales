/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react'
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import PlatformsSalesGraph from './PlatformsSalesGraph';

type Props = {
  chartData: {x:string, y:number}[],
  history: RouteComponentProps['history'],
  totalSold:number,
  totalPlatforms: number,
  totalGenres: number,
}
const SalesByPlatform: React.FC<Props> = ({chartData, history, totalSold, totalPlatforms, totalGenres}) => {
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
