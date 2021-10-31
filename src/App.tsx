import React, { useEffect, useState } from 'react';
import './App.css';

type SalesInfo = {
  [key:string]: string
}

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

function App() {
  const [sales, setSales] = useState<SalesInfo[]>([]);

  useEffect(() => {
    async function loadCsv() {
      const response = await fetch('https://raw.githubusercontent.com/diogoribeiro/datasets/main/video-game-sales.csv');
      const csv = await response.text();
      const salesInfo:SalesInfo[] = csvToJson(csv);
      setSales(salesInfo);
    };

    loadCsv();
  }, []);

  return (
    <div>
      {sales.length ?
        <span>Sales info</span>:
        <span>Loading...</span>
      }
    </div>
  );
}

export default App;
