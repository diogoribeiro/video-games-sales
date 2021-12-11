import React from 'react';
import Slider from '../Slider';
import SalesGraph from './PlatformSalesGraph';
import { Period } from '../../types';
import styles from './SalesByPlatform.module.css';

type Props = {
  chartData: {x:string, y:number}[],
  onChangePeriod: (newPeriod:number[]) => void,
  onClickBar: (props: any) => void,
  period: Period,
  selectedPeriod: Period,
}

const SalesByPlatform: React.FC<Props> = ({chartData, onChangePeriod, onClickBar, period, selectedPeriod}) => {
  return (
    <div className={styles.container}>
      <div className={styles['slider-container']}>
        <Slider
          onChange={onChangePeriod}
          period={period}
          selectedPeriod={selectedPeriod}
        />
      </div>
      <div className={styles['graph-container']}>
        <SalesGraph data={chartData} onClick={onClickBar} period={selectedPeriod}/>
      </div>
      <div className={styles['body-container']}>
        <p className={styles.copy}>
          Total worldwide sales (in millions of units) per platform. For all platforms that are no longer manufactured, all figures are total shipments from manufacturers. For current platforms, all figures are current sales as measured by VGChartz.
        </p>
        <p className={styles.copy}>
          You may click on the platform bar to get more details about its sales.
        </p>
      </div>
    </div>
  );
}

export default SalesByPlatform;
