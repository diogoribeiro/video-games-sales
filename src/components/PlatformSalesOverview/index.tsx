import React from 'react';
import { Link } from 'react-router-dom';
import { Period, Sale } from "../../types";
import SalesByRegion from './SalesByRegion';
import GenreSalesSummary from './GenreSalesSummary';
import { RegionsSales } from '../../types';
import Slider from '../Slider';
import styles from './PlatformSalesOverview.module.css';

type Props = {
  totalSoldByPlatform: number,
  platformName: string,
  platformSales: Sale[],
  totalSoldByRegion: RegionsSales,
  onChangePeriod: (newPeriod:number[]) => void,
  period: Period,
  selectedPeriod: Period,
}

const PlatformSalesOverview: React.FC<Props>= ({
  totalSoldByPlatform, platformName, platformSales, totalSoldByRegion,
  onChangePeriod, period, selectedPeriod
}) =>  {
  return (
    <div className={styles.container}>
      <div className={styles['header-container']}>
        <h3 className={styles.title}>
          {platformName} sales overview
        </h3>
        <Link
          className={styles['close-button']}
          to="/"
        >
          X
        </Link>
      </div>
      <div className={styles.copy}>
        <p>
          {platformName} sold {Math.floor(totalSoldByPlatform)}MM video games across the globe since {selectedPeriod.begin}
        </p>
        <p>
          Here is how it was distributed by region and genre.
        </p>
      </div>
      <div className={styles['slider-container']}>
        <Slider
          onChange={onChangePeriod}
          period={period}
          selectedPeriod={selectedPeriod}
        />
      </div>
      <div className={styles['graphs-container']}>
        <SalesByRegion totalSoldByRegion={totalSoldByRegion} totalSold={totalSoldByPlatform} />
        <div className={styles['genre-graph-container']}>
          <GenreSalesSummary sales={platformSales} totalSold={totalSoldByPlatform} />
        </div>
      </div>
    </div>
  );
}

export default PlatformSalesOverview;
