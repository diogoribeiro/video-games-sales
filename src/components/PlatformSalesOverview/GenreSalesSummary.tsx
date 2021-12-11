import React from "react";
import { SalesSummary } from '../../types';
import countSalesByGenere from "../../utils/countSalesByGenre";
import SalesGraph from "../SalesGraph";

const GenreSalesSummary: React.FC<SalesSummary>= ({ sales }) =>  {
  const genresSalesInfo = countSalesByGenere(sales);
  const mostSoldGenres = Object.keys(genresSalesInfo).slice(0, 5);
  const graphData = mostSoldGenres.map((genre) => {
    return { x: genre, y: genresSalesInfo[genre] }
  });

  return (
    <SalesGraph
      data={graphData}
      labelX="Genre"
      labelY="# of sales per genre (in millions of units)"
    />
  );
}

export default GenreSalesSummary;
