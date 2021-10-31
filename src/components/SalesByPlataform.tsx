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
    .slice(0, 20)
    .reduce((plataforms:PlataformsSales, platform) => {
      plataforms[platform] = plataformsSales[platform];

      return plataforms;
    }, {});

  return (
    <div
      css={{
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      {sales.length ?
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
              data={Object.keys(plataformsSales).sort((pA, pB) => plataformsSales[pB] - plataformsSales[pA]).map((platform: string) =>({x: platform, y: plataformsSales[platform]}))}
              style={{
                data: {
                  fill: 'tomato',
                }
              }}
            />
          </VictoryChart>
        </GraphContainer>:
        <span>Loading...</span>
      }
    </div>
  );
}

export default SalesByPlataform;
