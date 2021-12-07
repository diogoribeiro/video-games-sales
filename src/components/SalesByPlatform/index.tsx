import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import ReactSlider from 'react-slider';
import SalesGraph from './SalesGraph';
import { Period } from '../../types';
import styles from './SalesByPlatform.module.css';

type Props = {
  chartData: {x:string, y:number}[],
  history: RouteComponentProps['history'],
  onChangePeriod: (newPeriod:number[]) => void,
  totalSold:number,
  totalPlatforms: number,
  totalGenres: number,
  period: Period,
  selectedPeriod: Period,
}
const SalesByPlatform: React.FC<Props> = ({chartData, history, onChangePeriod, totalSold, totalPlatforms, totalGenres, period, selectedPeriod}) => {
  return (
    <div className={styles.container}>
      <div className={styles['slider-container']}>
        <ReactSlider
          className={styles['horizontal-slider']}
          defaultValue={[period.begin, period.end]}
          min={period.begin}
          max={period.end}
          markClassName={styles['mark']}
          step={5}
          onChange={onChangePeriod}
          value={[selectedPeriod.begin, selectedPeriod.end]}
          thumbClassName={styles['thumb']}
          trackClassName={styles['track']}
          renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
        />
      </div>
      <div className={styles['graph-container']}>
        <SalesGraph data={chartData} onClick={(props) => history.push(`/platform/${props.datum.xName}`)} period={selectedPeriod}/>
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
