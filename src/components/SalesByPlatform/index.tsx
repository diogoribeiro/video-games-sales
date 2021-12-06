import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import SalesGraph from './SalesGraph';
import styles from './SalesByPlatform.module.css';

type Props = {
  chartData: {x:string, y:number}[],
  history: RouteComponentProps['history'],
  totalSold:number,
  totalPlatforms: number,
  totalGenres: number,
}
const SalesByPlatform: React.FC<Props> = ({chartData, history, totalSold, totalPlatforms, totalGenres}) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles['header-section']}>
          <p>{Math.floor(totalSold)}</p>
          <p>Sales</p>
        </div>
        <div className={styles['header-section']}>
          <p>{totalPlatforms}</p>
          <p>Platforms</p>
        </div>
        <div className={styles['header-section']}>
          <p>{totalGenres}</p>
          <p>Genres</p>
        </div>
      </div>

      <div className={styles['body-container']}>
        <p className={styles.copy}>
          Total worldwide sales (in millions of units) per platform. For all platforms that are no longer manufactured, all figures are total shipments from manufacturers. For current platforms, all figures are current sales as measured by VGChartz.
        </p>
        <p className={styles.copy}>
          You may click on the platform bar to get more details about its sales.
        </p>
      </div>
      <div className={styles['graph-container']}>
        <SalesGraph data={chartData} onClick={(props) => history.push(`/platform/${props.datum.xName}`)}/>
      </div>
    </div>
  );
}

export default SalesByPlatform;
