import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PlatformSalesOverview from './PlatformSalesOverview';
import SalesByPlataform from './components/SalesByPlataform';
import { SalesProvider } from './providers/SalesProvider';
import useStore from './store';

const App:React.FC = () => {
  const store = useStore();
  const { loadSales } = store.actions;

  useEffect(() => {
    loadSales();
  }, [loadSales]);

  return (
    <div>
      <Router>
        <SalesProvider value={store}>
          <Route exact path="/" component={SalesByPlataform} />
          <Route path="/platform/:platformName" component={PlatformSalesOverview} />
        </SalesProvider>
      </Router>
    </div>
  );
}

export default App;
