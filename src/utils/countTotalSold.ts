import { Sale } from "../types";

function countTotalSold(sales: Sale[]) {
  return sales.reduce((total, sale) => {
    const totalSales = sale.globalSales;
    if(totalSales) total += totalSales;
  
    return total;
  }, 0);
}

export default countTotalSold;