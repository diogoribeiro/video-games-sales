import { PlataformsSales, SalesInfo } from "../types";

function countSalesByGenere (sales: SalesInfo[]) {
  return sales.reduce((plataforms:PlataformsSales, sale) => {
    if (!plataforms[sale.Genre]) plataforms[sale.Genre] = 0;
    const totalSales = parseFloat(sale.Global_Sales);
    if(totalSales) plataforms[sale.Genre] += totalSales;

    return plataforms;
  }, {});
}

export default countSalesByGenere;