import { SalesInfo } from "../types";

function countTotalSold(sales: SalesInfo[]) {
  return sales.reduce((total, sale) => {
    const totalSales = parseFloat(sale.Global_Sales);
    if(totalSales) total += totalSales;
  
    return total;
  }, 0);
}

export default countTotalSold;