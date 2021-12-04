import { Link } from 'react-router-dom';
import styles from './Layout.module.css';

const Layout:React.FC = ({ children }) => (
  <article className={styles.container}>
    <header className={styles['header-container']}>
      <Link
        className={styles.title}
        to="/"
      >
        <h1>
          Video games sales
        </h1>
        <span>Since 1980</span>
      </Link>
    </header>
    <main className={styles['body-container']}>
      <div className={styles['body-background']} />
      {children}
    </main>
    <footer className={styles.footer}>
      <span>Developed by Diogo Ribeiro</span>
    </footer>
  </article>
);

export default Layout;
