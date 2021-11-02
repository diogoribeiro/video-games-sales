import { PlataformsSales, SalesInfo } from "../types";

function countSales (sales: SalesInfo[], salesField: string) {
  return sales
    .reduce((plataforms:PlataformsSales, sale) => {
      if (!plataforms[sale.Platform]) plataforms[sale.Platform] = 0;
      const totalSales = parseFloat(sale[salesField]);
      if(totalSales) plataforms[sale.Platform] += totalSales;

      return plataforms;
    }, {});
}

export default countSales;