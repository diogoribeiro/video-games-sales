import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import PlatformsSalesGraph from './PlatformsSalesGraph';
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
          The following graph shows the number of video games sales for the 10 most popular platforms since 1980.
        </p>
        <p className={styles.copy}>
          You may click on the platform bar to get more details about its sales.
        </p>
      </div>
      <div className={styles['graph-container']}>
        <PlatformsSalesGraph data={chartData} onClick={(props) => history.push(`/platform/${props.datum.xName}`)}/>
      </div>
    </div>
  );
}

export default SalesByPlatform;
