import React from 'react';
import { useParams  } from "react-router-dom";
import { useSalesProvider } from './providers/SalesProvider';
import { VictoryChart, VictoryBar } from "victory";
import { PlataformsSales } from './types';
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react'
import SalesByRegion from './components/SalesByRegion';
import GraphContainer from './components/GraphContainer';

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
      <h3>{platformName} sales overview</h3>
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
            animate={{ duration: 500 }}
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
