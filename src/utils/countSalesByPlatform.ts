import { PlataformsSales, Sale, Period, SalesRegion } from "../types";
import memoize from 'lodash.memoize';

function countSales (sales: Sale[], period:Period, salesRegion: SalesRegion) {
  return sales
    .filter(sale => sale.releaseYear >= period.begin && sale.releaseYear <= period.end)
    .reduce((plataforms:PlataformsSales, sale) => {
      if (!plataforms[sale.platform]) plataforms[sale.platform] = 0;
      const totalSales:number = sale[salesRegion];
      if(totalSales) plataforms[sale.platform] += totalSales;

      return plataforms;
    }, {});
}

export default memoize(countSales);