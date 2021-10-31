import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import React from 'react';
import { VictoryBar, VictoryChart, Bar } from "victory";
import { SalesInfo, PlataformsSales } from '../types';

import csvToJson from '../utils/csvToJson';


const SalesByPlataform: React.FC= () => {
  const [sales, setSales] = useState<SalesInfo[]>([]);
  const history = useHistory();

  useEffect(() => {
    async function loadCsv() {
      const response = await fetch('https://raw.githubusercontent.com/diogoribeiro/datasets/main/video-game-sales.csv');
      const csv = await response.text();
      const salesInfo:SalesInfo[] = csvToJson(csv);
      setSales(salesInfo);
    };

    loadCsv();
  }, []);

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
                  mutation: (props) => history.push(`/platform/${props.datum.xName}`)
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
