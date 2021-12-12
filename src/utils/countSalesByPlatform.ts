import { PlataformsSales, Sale, Period } from "../types";
import memoize from 'lodash.memoize';

function countSales (sales: Sale[], period:Period, salesField: 'naSales'|'euSales'|'jpSales'|'otherSales'|'globalSales') {
  return sales
    .filter(sale => sale.releaseYear >= period.begin && sale.releaseYear <= period.end)
    .reduce((plataforms:PlataformsSales, sale) => {
      if (!plataforms[sale.platform]) plataforms[sale.platform] = 0;
      const totalSales:number = sale[salesField];
      if(totalSales) plataforms[sale.platform] += totalSales;

      return plataforms;
    }, {});
}

export default memoize(countSales);