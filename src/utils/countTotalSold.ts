import { Sale } from "../types";
import memoize from 'lodash.memoize';

function countTotalSold(sales: Sale[]) {
  return sales.reduce((total, sale) => {
    const totalSales = sale.globalSales;
    if(totalSales) total += totalSales;
  
    return total;
  }, 0);
}

export default memoize(countTotalSold);