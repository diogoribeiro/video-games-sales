import React from 'react';
import { VictoryBar, VictoryBarProps, VictoryLabel, VictoryLabelProps } from 'victory';

const RegionSalesLabel: React.FC<VictoryLabelProps> = (props) => {
  const {children, ...labelProps} = props

  return (
    <VictoryLabel
      {...labelProps}
      dx={-1}
      style={{ ...labelProps.style, fontFamily: 'Bowlby One, cursive', fontSize: '12px' }}
      renderInPortal
      textAnchor="end"
      verticalAnchor="middle"
    />
  )
}

interface Props extends VictoryBarProps {
  onClick: (props: any) => any
}

const PlatformsSalesGraph:React.FC<Props> = ({ data, onClick }) => {
  return (
    <VictoryBar
      animate={{
        onLoad: { duration: 800 }
      }}
      barWidth={20}
      padding={10}
      data={data}
      horizontal
      labels={({ datum }) => `${datum.x} ${datum.y.toFixed(2)} SALES`}
      labelComponent={<RegionSalesLabel />}
      style={{ data: { fill: '#473f49' }, labels: { fill: '#FFF' } }}
      width={700}
      events={[
        {
          target: "data",
          eventHandlers: {
            onClick: () => ({
              target: 'data',
              mutation: onClick,
            }),
            onMouseOver: () => ([
              {
                target: 'data',
                mutation: () => ({style: {fill: "#FFF", stroke: '#473f49', cursor: 'pointer'}})
              },
              {
                target: 'labels',
                mutation: () => ({style: {fill: "#473f49"}})
              },
            ]),
            onMouseOut: () => ([
              {
                target: 'data',
                mutation: () => ({style: {fill: "#473f49", stroke: 'transparent'}})
              },
              {
                target: 'labels',
                mutation: () => ({style: {fill: "#FFF"}})
              },
            ])
          }
        },
      ]}
    />
  )
}

export default PlatformsSalesGraph;