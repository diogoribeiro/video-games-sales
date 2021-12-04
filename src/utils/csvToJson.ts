import { SaleCSV, Sale } from '../types';

function csvToJson(csv: string):Sale[] {
  const csvLines:Array<string> = csv.split('\n');
  const columns:Array<string> = csvLines[0].split(',');
  const sales:Sale[] = csvLines.slice(1).map((line) => {
    const sale = line.split(',').reduce(
      function (saleRow: SaleCSV, columnValue:string, columnIndex:number) {
        saleRow[columns[columnIndex]] = columnValue

        return saleRow;
      },
      {}
    );

    return {
      platform: sale['Platform'],
      releaseYear: parseInt(sale['Year_of_Release']),
      genre: sale['Genre'],
      name: sale['Name'],
      publisher: sale['Publisher'],
      naSales: parseFloat(sale['NA_Sales']),
      euSales: parseFloat(sale['EU_Sales']),
      jpSales: parseFloat(sale['JP_Sales']),
      otherSales: parseFloat(sale['Other_Sales']),
      globalSales: parseFloat(sale['Global_Sales']),
      criticScore: parseFloat(sale['Critic_Score']),
      criticCount: parseFloat(sale['Critic_Count']),
      userScore: parseFloat(sale['User_Score']),
      userCount: parseFloat(sale['User_Count']),
      developer: sale['Developer'],
      rating: sale['Rating'],
    };
  });

  return sales;
}

export default csvToJson;