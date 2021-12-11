import React from 'react';
import { VictoryBarProps, VictoryLabel } from 'victory';
import { Period } from '../../types';
import { purple800 } from '../../utils/theme';
import SalesGraph from '../SalesGraph';

interface Props extends VictoryBarProps {
  onClick: (props: any) => any,
  period: Period,
}

const labelStyles = {
  fill: purple800,
  fontSize: 10,
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
      style={labelStyles}
    />
    </SalesGraph>
  )
}

export default PlatformSalesGraph;