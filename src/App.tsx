import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PlatformSalesOverview from './components/PlatformSalesOverview';
import SalesByPlatform from './components/SalesByPlatform';
import { SalesProvider } from './providers/SalesProvider';
import useStore from './store';
import Layout from './components/Layout';

import './App.css';

const App:React.FC = () => {
  const store = useStore();
  const { actions, state } = store;
  const { loadSales } = actions;
  const sales = state.sales;

  useEffect(() => {
    loadSales();
  }, [loadSales]);

  if (!sales.length) return <div>Loading...</div>

  return (
    <Router>
      <Layout>
        <SalesProvider value={store}>
          <Route exact path="/" component={SalesByPlatform} />
          <Route path="/platform/:platformName" component={PlatformSalesOverview} />
        </SalesProvider>
      </Layout>
    </Router>
  );
}

export default App;
