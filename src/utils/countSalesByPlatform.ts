import { PlataformsSales, Sale } from "../types";

function countSales (sales: Sale[], salesField: 'naSales'|'euSales'|'jpSales'|'otherSales'|'globalSales') {
  return sales
    .reduce((plataforms:PlataformsSales, sale) => {
      if (!plataforms[sale.platform]) plataforms[sale.platform] = 0;
      const totalSales:number = sale[salesField];
      if(totalSales) plataforms[sale.platform] += totalSales;

      return plataforms;
    }, {});
}

export default countSales;