import React from 'react';
import { VictoryBar, VictoryChart, Bar } from "victory";
import { SalesInfo, PlataformsSales } from '../types';

const SalesByPlataform: React.FC<{sales: SalesInfo[]}> = ({ sales }) =>{
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
    <div>
      {sales.length ?
        <VictoryChart
          height={400}
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
                  mutation: (props) => console.log(props.datum.xName)
                })
              }
            }
          ]}
        >
          <VictoryBar
            name="plataforSalesChart"
            dataComponent={
              <Bar events={{ onClick: console.log }}/>
            }
            data={Object.keys(plataformsSales).sort((pA, pB) => plataformsSales[pB] - plataformsSales[pA]).map((platform: string) =>({x: platform, y: plataformsSales[platform]}))}
          />
        </VictoryChart>:
        <span>Loading...</span>
      }
    </div>
  );
}

export default SalesByPlataform;
