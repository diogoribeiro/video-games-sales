import { GenresSales, SalesInfo } from "../types";

function countUniqueGenres(sales: SalesInfo[]) {
  return sales.reduce((genres:GenresSales, sale) => {
    if (!genres[sale.Genre]) genres[sale.Genre] = 1;
  
    return genres;
  }, {});
};

export default countUniqueGenres;