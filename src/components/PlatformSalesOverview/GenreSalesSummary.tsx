import React from "react";
import { SalesSummary } from '../../types';
import PercentageGraph from './PercentageGraph';
import countSalesByGenere from "../../utils/countSalesByGenre";
import styles from './GenreSalesSummary.module.css';

const GenreSalesSummary: React.FC<SalesSummary>= ({ sales, totalSold }) =>  {
  const colors = ["#F58067", "#FA5D97", "#473f49"];
  const genresSalesInfo = countSalesByGenere(sales);

  return (
    <>
      {Object.keys(genresSalesInfo).slice(0, 3).map((genre, index) => {
        const percentage = (genresSalesInfo[genre]/totalSold) * 100
        return (
          <div
            key={genre}
            className={styles.container}
          >
            <PercentageGraph
              color={colors[index]}
              percentageInfo={{
                label: `${percentage.toFixed(2)}%\n ${genre}`,
                percentage: percentage,
                total: totalSold,
              }}
            />
          </div>
        );
      })}
    </>
  );
}

export default GenreSalesSummary;
