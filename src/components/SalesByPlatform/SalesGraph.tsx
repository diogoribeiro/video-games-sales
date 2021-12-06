import React from 'react';
import { VictoryBar, VictoryBarProps, VictoryChart } from 'victory';
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

const SalesGraph:React.FC<Props> = ({ data, onClick }) => {
  return (
    <VictoryChart domainPadding={20}>
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