import { GenresSales, Sale } from "../types";
import memoize from "lodash.memoize";

function countUniqueGenres(sales: Sale[]) {
  return sales.reduce((genres: GenresSales, sale) => {
    if (!genres[sale.genre]) {
      genres[sale.genre] = 1;
    }

    return genres;
  }, {});
}

export default memoize(countUniqueGenres);
