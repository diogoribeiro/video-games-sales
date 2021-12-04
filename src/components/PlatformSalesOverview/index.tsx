import React from 'react';
import { Link } from 'react-router-dom';
import { Sale } from "../../types";

import SalesByRegion from './SalesByRegion';
import GenreSalesSummary from './GenreSalesSummary';
import styles from './PlatformSalesOverview.module.css';

type Props = {
  totalSoldByPlatform: number,
  platformName: string,
  platformSales: Sale[],
}

const PlatformSalesOverview: React.FC<Props>= ({ totalSoldByPlatform, platformName, platformSales }) =>  {
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
          {platformName} sold {Math.floor(totalSoldByPlatform)} video games across the globe since {Math.min(...platformSales.map(sale => sale.releaseYear || new Date().getFullYear()))}
        </p>
        <p>
          Here is how it was distributed by region and genre.
        </p>
      </div>
      <div className={styles['graphs-container']}>
        <SalesByRegion sales={platformSales} totalSold={totalSoldByPlatform} />
        <div className={styles['genre-graph-container']}>
          <GenreSalesSummary sales={platformSales} totalSold={totalSoldByPlatform} />
        </div>
      </div>
    </div>
  );
}

export default PlatformSalesOverview;