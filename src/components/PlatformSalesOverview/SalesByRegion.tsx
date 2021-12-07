import React from "react";
import { RegionsSales } from '../../types';
import { VictoryPie } from "victory";
import percentage from "../../utils/percentage";
import styles from './SalesByRegion.module.css';

function getLabel(region:string, regionTotal:number, totalSold:number) {
  return `${region} \n ${percentage(regionTotal,totalSold).toFixed(2)}%`
}

type Props = {
  totalSold: number,
  totalSoldByRegion: RegionsSales,
}

const SalesByRegion: React.FC<Props>= ({ totalSoldByRegion, totalSold }) =>  {
  return (
    <div className={styles.container}>
      <VictoryPie
        colorScale={["#F58067", "#FAA85D", "#473f49", '#de5752' ]}
        data={[
          {x: 1, y: totalSoldByRegion.eu, label: getLabel('EU', totalSoldByRegion.eu,totalSold)},
          {x: 1, y: totalSoldByRegion.northAmerica, label: getLabel('North America', totalSoldByRegion.northAmerica, totalSold)},
          {x: 1, y: totalSoldByRegion.japan, label: getLabel('Japan', totalSoldByRegion.japan, totalSold)},
          {x: 1, y: totalSoldByRegion.others, label: getLabel('Others', totalSoldByRegion.others, totalSold)},
        ]}
        style={{
          labels: { fontSize: 12 }
        }}
      />
    </div>
  );
}

export default SalesByRegion;
