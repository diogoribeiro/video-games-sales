import React from "react";
import { RegionsSales } from '../../types';
import { VictoryPie } from "victory";
import percentage from "../../utils/percentage";
import { appColors } from '../../utils/theme';
import styles from './SalesByRegion.module.css';

function getLabel(region:string, regionTotal:number, totalSold:number) {
  return `${region} \n ${percentage(regionTotal,totalSold).toFixed(2)}%`
}

type Props = {
  totalSold: number,
  totalSoldByRegion: RegionsSales,
}

const pieGraphStyles = {
  labels: { fontSize: 12 }
}

const SalesByRegion: React.FC<Props>= ({ totalSoldByRegion, totalSold }) =>  {
  const graphData = [
    {y: totalSoldByRegion.eu, label: getLabel('EU', totalSoldByRegion.eu,totalSold)},
    {y: totalSoldByRegion.northAmerica, label: getLabel('North America', totalSoldByRegion.northAmerica, totalSold)},
    {y: totalSoldByRegion.japan, label: getLabel('Japan', totalSoldByRegion.japan, totalSold)},
    {y: totalSoldByRegion.others, label: getLabel('Others', totalSoldByRegion.others, totalSold)},
  ];

  return (
    <div className={styles.container}>
      <VictoryPie
        colorScale={appColors}
        data={graphData}
        style={pieGraphStyles}
      />
    </div>
  );
}

export default SalesByRegion;
