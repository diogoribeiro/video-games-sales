import React from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react'

type GraphContainerProps = {
  className?: string
  subtitle: string,
  children?: React.ReactNode
}

const GraphContainer: React.FC<GraphContainerProps> = ({ subtitle, children, className }) => (
  <div className={className}>
    {children}
    <span css={{
      display: 'block',
      textAlign: 'center'
    }}>
      {subtitle}
    </span>
  </div>
);

export default GraphContainer;