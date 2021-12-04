import React from "react";
import { VictoryLabel, VictoryPie } from "victory";

interface Props {
  percentageInfo: {
    label: string,
    percentage: number,
    total: number,
  },
  color: string,
}

const PercentageGraph:React.FC<Props> = ({ percentageInfo, color }) => {
  const label = (
    <VictoryLabel
      textAnchor="middle"
      verticalAnchor="middle"
      x={200}
      y={200}
      text={percentageInfo.label}
      style={{ fontSize: 20, fill: color }}
    />
  )
  return (
    <VictoryPie
      data={[percentageInfo.percentage, (100-percentageInfo.percentage)]}
      innerRadius={(props) => props.index === 1 ? 140: 100}
      cornerRadius={10}
      labels={[percentageInfo.label, '']}
      labelComponent={label}
      colorScale={[color, "#e0e0e0" ]}
    />
  );
}

export default PercentageGraph;
