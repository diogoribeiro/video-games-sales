import React from 'react';
import styles from './GraphContainer.module.css';

type GraphContainerProps = {
  className?: string
  subtitle: string,
  children?: React.ReactNode
}

const GraphContainer: React.FC<GraphContainerProps> = ({ subtitle, children, className }) => (
  <div className={className}>
    {children}
    <span className={styles.title}>
      {subtitle}
    </span>
  </div>
);

export default GraphContainer;