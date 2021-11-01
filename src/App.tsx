import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import PlatformSalesOverview from './components/PlatformSalesOverview';
import SalesByPlatform from './components/SalesByPlatform';
import { SalesProvider } from './providers/SalesProvider';
import useStore from './store';
import bg from './bg.jpg';

/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react'


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
      <article
        css={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          maxHeight: '100vh',
        }}
      >
        <header
          css={{
            alignItems: 'center',
            background: `url(${bg}) no-repeat, rgb(255, 255, 255)`,
            borderBottom: '1px dashed #000',
            backgroundBlendMode: 'exclusion',
            display: 'flex',
            height: '300px',
            justifyContent: 'center'
          }}
        >
          <Link
            css={{
              textDecoration: 'none',
            }}
            to="/"
          >
            <h1 css={{
              background: '#fff',
              color: '#000',
              textAlign: 'center',
              fontSize: '60px',
              textShadow: '2px 2px #FFF',
              '@media (max-width: 809px)': {
                fontSize: '36px',
              }
            }}>
              Video games sales
            </h1>
          </Link>
        </header>
        <main
          css={{
            flexGrow: 1,
          }}
        >
          <SalesProvider value={store}>
            <Route exact path="/" component={SalesByPlatform} />
            <Route path="/platform/:platformName" component={PlatformSalesOverview} />
          </SalesProvider>
        </main>
        <footer
          css={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            padding: '20px 0',
          }}
          >
          <span>Developed by Diogo Ribeiro</span>
        </footer>
      </article>
    </Router>
  );
}

export default App;
