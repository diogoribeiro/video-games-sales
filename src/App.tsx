import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import PlatformSalesOverview from './components/PlatformSalesOverview';
import SalesByPlatform from './components/SalesByPlatform';
import { SalesProvider } from './providers/SalesProvider';
import useStore from './store';
import './App.css';
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
            alignItems: 'flex-start',
            background: '#de5752',
            display: 'flex',
            height: '200px',
            justifyContent: 'center',
          }}
        >
          <Link
            css={{
              color: '#FFFFFF',
              textAlign: 'center',
              textDecoration: 'none',
            }}
            to="/"
          >
            <h1 css={{
              fontFamily: 'Bowlby One, cursive',
              fontSize: '50px',
              '@media (max-width: 809px)': {
                fontSize: '36px',
              },
              marginBottom: '0',
            }}>
              Video games sales
            </h1>
            <span>Since 1980</span>
          </Link>
        </header>
        <main
          css={{
            flex: 1,
            maxWidth: '100vw',
          }}
        >
          <div
            css={{
              '&:after': {
                background: `url(${bg}) no-repeat, #ffffff`,
                backgroundBlendMode: 'exclusion',
                content: '" "',
                display: 'block',
                left: 0,
                height: '100%',
                opacity: 0.05,
                position: 'absolute',
                top: 0,
                width: '100%',
                zIndex: -1,
              }
            }}
          />
          <SalesProvider value={store}>
            <Route exact path="/" component={SalesByPlatform} />
            <Route path="/platform/:platformName" component={PlatformSalesOverview} />
          </SalesProvider>
        </main>
        <footer
          css={{
            alignItems: 'center',
            background: '#F58067',
            color: '#FFF',
            display: 'flex',
            height: '36px',
            justifyContent: 'center',
          }}
          >
          <span>Developed by Diogo Ribeiro</span>
        </footer>
      </article>
    </Router>
  );
}

export default App;
