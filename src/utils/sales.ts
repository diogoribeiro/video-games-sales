import { Period, RegionsSales, Sale } from "../types";

export function getPlatformSalesByPeriod(sales: Sale[], platformName: string, period: Period) {
  return sales.filter(sale => sale.platform === platformName &&
    sale.releaseYear >= period.begin &&
    sale.releaseYear <= period.end
  );
}

export function countTotalSalesByRegion(sales: Sale[]) {
  return sales
    .reduce((plataforms: RegionsSales, sale) => {
      plataforms.eu += sale.euSales || 0;
      plataforms.northAmerica += sale.naSales || 0;
      plataforms.japan += sale.jpSales || 0;
      plataforms.others += sale.otherSales || 0;

      return plataforms;
    }, {
      eu: 0,
      northAmerica: 0,
      japan: 0,
      others: 0,
    });
}