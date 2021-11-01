import React from 'react';
import { Link } from 'react-router-dom';
import { useParams  } from "react-router-dom";
import { useSalesProvider } from '../providers/SalesProvider';
import { VictoryChart, VictoryBar } from "victory";
import { PlataformsSales } from '../types';
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react'
import SalesByRegion from './SalesByRegion';
import GraphContainer from './GraphContainer';

const PlatformSalesOverview: React.FC= () =>  {
  const { platformName } = useParams<{platformName: string}>();
  const { state } = useSalesProvider();
  const sales = state.sales;

  let totalSoldByGenre = sales
    .filter(sale => sale.Platform === platformName)
    .reduce((plataforms:PlataformsSales, sale) => {
      if (!plataforms[sale.Genre]) plataforms[sale.Genre] = 0;
      const totalSales = parseFloat(sale.Global_Sales);
      if(totalSales) plataforms[sale.Genre] += totalSales;

      return plataforms;
    }, {})

  return (
    <div css={{
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div
        css={{
          alignItems: 'center',
          display: 'flex',
        }}
      >
        <h3
          css={{
            flexGrow: 1,
            fontSize: '30px',
            margin: '0',
            paddingTop: '20px',
            textAlign: 'center',
            '@media (max-width: 809px)': {
              fontSize: '24px',
            }
          }}
        >
          {platformName} sales overview
        </h3>
        <Link
            css={{
              color: '#000',
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
      <div css={{
        display: 'flex',
        justifyContent: 'space-evenly',
        '@media (max-width: 809px)': {
          flexDirection: 'column',
        }
      }}>

        <SalesByRegion sales={sales} platformName={platformName} />

        <GraphContainer
          css={{
            height: '300px',
            width: '700px',
            maxWidth: '100%',
          }}
          subtitle="Sales by genre"
        >
          <VictoryChart
            height={300}
            width={850}
            domainPadding={{ x: 1, y: [0, Object.keys(totalSoldByGenre).length] }}
            scale={{ x: "time" }}
          >
            <VictoryBar
              name="genreSalesChart"
              data={Object.keys(totalSoldByGenre).sort((genreA, genreB) => totalSoldByGenre[genreB] - totalSoldByGenre[genreA]).slice(0, 10).map((genre: string) =>({x: genre, y: totalSoldByGenre[genre]}))}
              style={{
                data: {
                  fill: 'tomato',
                  fillOpacity: 0.7
                }
              }}
            />
          </VictoryChart>
        </GraphContainer>
      </div>
    </div>
  );
}

export default PlatformSalesOverview;
