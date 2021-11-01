/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react'
import React from 'react';
import { useHistory } from "react-router-dom";
import { VictoryBar, VictoryChart } from "victory";
import { PlataformsSales } from '../types';
import { useSalesProvider } from '../providers/SalesProvider';
import GraphContainer from './GraphContainer';

const SalesByPlataform: React.FC = () => {
  const {state} = useSalesProvider();
  const sales = state.sales;
  const history = useHistory();

  let plataformsSales = sales
    .reduce((plataforms:PlataformsSales, sale) => {
      if (!plataforms[sale.Platform]) plataforms[sale.Platform] = 0;
      const totalSales = parseFloat(sale.Global_Sales);
      if(totalSales) plataforms[sale.Platform] += totalSales;

      return plataforms;
    }, {})

  plataformsSales = Object.keys(plataformsSales)
    .sort((pA, pB) => plataformsSales[pB] - plataformsSales[pA])
    .slice(0, 20)
    .reduce((plataforms:PlataformsSales, platform) => {
      plataforms[platform] = plataformsSales[platform];

      return plataforms;
    }, {});

  const chartData = Object.keys(plataformsSales)
    .sort((pA, pB) => plataformsSales[pB] - plataformsSales[pA])
    .map((platform: string) =>({x: platform, y: plataformsSales[platform]}))

  return (
    <div
      css={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '20px',
        maxWidth: '100vw',
        width: '100vw'
      }}
    >
      <div
        css={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <p
          css={{
            textAlign: 'center',
            margin: 0,
          }}
        >
          The following graph shows the number of video game sales for the 20 most popular platforms since 1980.
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
      <GraphContainer
        css={{
          height: '500px',
          width: '800px',
          maxWidth: '100%',
        }}
        subtitle="Sales by platform"
      >
        <VictoryChart
          height={500}
          width={800}
          domainPadding={{ x: 1, y: [0, 20] }}
          scale={{ x: "time" }}
          events={[
            {
              target: "data",
              childName: "plataforSalesChart",
              eventHandlers: {
                onClick: () => ({
                  target: "data",
                  mutation: (props) => history.push(`/platform/${props.datum.xName}`)
                }),
                onMouseOver: () => ({
                  mutation: () => ({style: {fill: "orange", cursor: 'pointer'}})
                }),
                onMouseOut: () => ({
                  mutation: () => ({style: {fill: "tomato"}})
                })
              }
            }
          ]}
        >
          <VictoryBar
            name="plataforSalesChart"
            data={chartData}
            style={{
              data: {
                fill: 'tomato',
              }
            }}
          />
        </VictoryChart>
      </GraphContainer>
    </div>
  );
}

export default SalesByPlataform;
