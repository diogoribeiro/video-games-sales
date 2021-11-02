import { PlataformsSales } from "../types";

export default function findMostSalesRegion(totalSoldByRegion: PlataformsSales, totalSoldByAllRegions: number) {
  return Object.keys(totalSoldByRegion).reduce((mostSalesRegion, currentRegion) => {
    if (totalSoldByRegion[currentRegion] > mostSalesRegion?.totalSold) {
      const totalSold = totalSoldByRegion[currentRegion];

      return {
        totalSold,
        percentage: (totalSold/totalSoldByAllRegions) * 100,
        region: currentRegion,
      }
    }

    return mostSalesRegion;
  }, {
    region: 'no region',
    totalSold: 0,
    percentage: 0,
  });
}