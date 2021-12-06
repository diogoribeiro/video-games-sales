import React from 'react';
import { VictoryAxis, VictoryBar, VictoryBarProps, VictoryChart } from 'victory';
import coin from './coins.png';

const Coins:React.FC = () => (
  <defs>
    <pattern id="coins" x="0" y="0" patternUnits="userSpaceOnUse" width="30" height="30">
      <image href={coin} x="0" y="0" width="30" height="30" />
    </pattern>
    <pattern id="bar" x="0" y="0" width="1" height="1">
      <rect width="100%" height="100%" fill="url(#coins)"/>
    </pattern>
  </defs>
)

interface Props extends VictoryBarProps {
  onClick: (props: any) => any
}

const axisStyles = {
  axis: {
    stroke: '#473f49',
  },
  axisLabel: {
    fill: '#de5752',
    fontSize: 8,
    fontStyle: 'italic',
    padding: 24,
  },
  grid: {
    stroke: '#473f49',
    opacity: 0.2,
  },
  tickLabels: {
    fontSize: 8,
    fill: '#473f49'
  },
}

const SalesGraph:React.FC<Props> = ({ data, onClick }) => {
  return (
    <VictoryChart domainPadding={20} height={250}>
      <VictoryAxis
        style={{
          ...axisStyles,
          axisLabel: {
            ...axisStyles.axisLabel,
            padding: 36,
          }
        }}
        label="# of sales  (in millions of units)"
        dependentAxis
      />
      <VictoryAxis
        style={axisStyles}
        label="Platform"
      />
      <Coins />
      <VictoryBar
        data={data}
        barWidth={30}
        style={{
          data: {
            fill: 'url(#bar)',
            cursor: 'pointer',
          }
        }}
        events={[
          {
            target: "data",
            eventHandlers: {
              onClick: () => ({
                target: 'data',
                mutation: onClick,
              }),
            }
          },
        ]}
      />
    </VictoryChart>
  )
}

export default SalesGraph;