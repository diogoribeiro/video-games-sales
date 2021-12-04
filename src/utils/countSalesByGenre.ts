import { PlataformsSales, Sale } from "../types";

function countSalesByGenere (sales: Sale[]) {
  return sales.reduce((plataforms:PlataformsSales, sale) => {
    if (!plataforms[sale.genre]) plataforms[sale.genre] = 0;
    const totalSales = sale.globalSales;
    if(totalSales) plataforms[sale.genre] += totalSales;

    return plataforms;
  }, {});
}

export default countSalesByGenere;