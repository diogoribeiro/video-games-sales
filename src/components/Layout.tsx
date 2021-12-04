import { Link } from 'react-router-dom';
import bg from '../bg.jpg';

/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react'


const Layout:React.FC = ({ children }) => (
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
      {children}
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
);

export default Layout;
