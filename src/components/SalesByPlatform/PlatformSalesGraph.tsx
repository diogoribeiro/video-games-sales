import React from 'react';
import { VictoryBarProps, VictoryLabel } from 'victory';
import { Period } from '../../types';
import SalesGraph from '../SalesGraph';

interface Props extends VictoryBarProps {
  onClick: (props: any) => any,
  period: Period,
}

const PlatformSalesGraph:React.FC<Props> = ({ data, onClick, period }) => {
  return (
    <SalesGraph
      data={data}
      labelX="Platform"
      labelY="# of sales per platform (in millions of units)"
      onClick={onClick}
    >
      <VictoryLabel
      text={`Sales for games released between ${period.begin} and ${period.end}`}
      x={225}
      y={25}
      textAnchor="middle"
      style={{ fill: '#473f49', fontSize: 10 }}
    />
    </SalesGraph>
  )
}

export default PlatformSalesGraph;