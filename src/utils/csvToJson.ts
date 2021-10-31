import { SalesInfo } from '../types';

function csvToJson(csv: string):SalesInfo[] {
  const csvLines:Array<string> = csv.split('\n');
  const columns:Array<string> = csvLines[0].split(',');
  const salesInfo:SalesInfo[] = csvLines.slice(1).map((line) => {
    return line.split(',').reduce(
      function (saleRow: SalesInfo, columnValue:string, columnIndex:number) {
        saleRow[columns[columnIndex]] = columnValue

        return saleRow;
      },
      {}
    );
  })

  return salesInfo;
}

export default csvToJson;