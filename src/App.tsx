import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import PlatformSalesOverview from './PlatformSalesOverview';
import SalesByPlataform from './components/SalesByPlataform';
import { SalesProvider } from './providers/SalesProvider';
import useStore from './store';
import bg from './bg.jpg';

/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react'


const App:React.FC = () => {
  const store = useStore();
  const { loadSales } = store.actions;

  useEffect(() => {
    loadSales();
  }, [loadSales]);

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
              Video game sales
            </h1>
          </Link>
        </header>
        <main
          css={{
            flexGrow: 1,
          }}
        >
          <SalesProvider value={store}>
            <Route exact path="/" component={SalesByPlataform} />
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
