import { useEffect, useState } from 'react';
import SalesByPlataform from './components/SalesByPlataform';
import csvToJson from './utils/csvToJson';

import { SalesInfo } from './types';


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
      <SalesByPlataform sales={sales} />
    </div>
  );
}

export default App;
