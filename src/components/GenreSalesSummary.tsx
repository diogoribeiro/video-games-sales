import React from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react'
import { SalesSummary } from '../types';
import PercentageGraph from './PercentageGraph';
import countSalesByGenere from "../utils/countSalesByGenre";

const GenreSalesSummary: React.FC<SalesSummary>= ({ sales, totalSold }) =>  {
  const colors = ["#F58067", "#FA5D97", "#473f49"];
  const genresSalesInfo = countSalesByGenere(sales);

  return (
    <>
      {Object.keys(genresSalesInfo).slice(0, 3).map((genre, index) => {
        const percentage = (genresSalesInfo[genre]/totalSold) * 100
        return (
          <div
            css={{
              width: '33%',
              height: '300px',
              '@media (max-width: 809px)': {
                width: '100%',
              }
            }}
            key={genre}
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
