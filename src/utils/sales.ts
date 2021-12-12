import { GenresSales, Period, PlataformsSales, RegionsSales, Sale, SalesRegion } from "../types";
import memoize from 'lodash.memoize';
import { unique } from "./array";

export const getPlatformSalesByPeriod = memoize(function getPlatformSalesByPeriod(sales: Sale[], platformName: string, period: Period) {
  return sales.filter(sale => sale.platform === platformName &&
    sale.releaseYear >= period.begin &&
    sale.releaseYear <= period.end
  );
});

export const countTotalSalesByRegion = memoize(function countTotalSalesByRegion(sales: Sale[]) {
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
});

export const countSalesByPlatform = memoize(function countSalesByPlatform(sales: Sale[], period:Period, salesRegion: SalesRegion) {
  return sales
    .filter(sale => sale.releaseYear >= period.begin && sale.releaseYear <= period.end)
    .reduce((plataforms:PlataformsSales, sale) => {
      if (!plataforms[sale.platform]) plataforms[sale.platform] = 0;
      const totalSales:number = sale[salesRegion];
      if(totalSales) plataforms[sale.platform] += totalSales;

      return plataforms;
    }, {});
});

export const countSalesByGenere = memoize(function countSalesByGenere(sales: Sale[]) {
  return sales.reduce((plataforms:GenresSales, sale) => {
    if (!plataforms[sale.genre]) plataforms[sale.genre] = 0;
    const totalSales = sale.globalSales;
    if(totalSales) plataforms[sale.genre] += totalSales;

    return plataforms;
  }, {});
});

export const countTotalSold = memoize(function countTotalSold(sales: Sale[]) {
  return sales.reduce((total, sale) => {
    const totalSales = sale.globalSales;
    if(totalSales) total += totalSales;

    return total;
  }, 0);
});

export const uniqueSalesYears = memoize(function uniqueSalesYears(sales: Sale[]) {
  return unique(
    sales.map(sale => sale.releaseYear)
      .filter(releaseYear => (releaseYear && releaseYear >= 1980))
  ).sort();
});