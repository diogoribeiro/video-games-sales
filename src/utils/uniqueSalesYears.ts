import { Sale } from "../types";
import unique from "./unique";
import memoize from 'lodash.memoize';

function uniqueSalesYears(sales: Sale[]) {
  return unique(
    sales.map(sale => sale.releaseYear)
      .filter(releaseYear => (releaseYear && releaseYear >= 1980))
  ).sort();
}

export default memoize(uniqueSalesYears);