import React from "react";
import { VictoryLabel, VictoryPie, VictoryTooltip } from "victory";
import { PieProps } from ".";

const RegionSalesLabel: React.FC = (props) => {
  const {children, ...labelProps} = props
  return (
    <React.Fragment>
      <g>
        <VictoryLabel
          {...labelProps}
          angle={-45}
        />
        <VictoryTooltip
          {...props}
          x={200}
          y={310}
          orientation="top"
          pointerLength={0}
          cornerRadius={60}
          flyoutWidth={120}
          flyoutHeight={120}
          flyoutStyle={{ stroke: "transparent", fill:'transparent' }}
          text={({datum}) => `${datum.y.toFixed(2)} sales`}
        />
      </g>
    </React.Fragment>
  )
}

// @ts-ignore
RegionSalesLabel.defaultEvents = VictoryTooltip.defaultEvents;

const DesktopPie:React.FC<PieProps> = ({ totalSoldByRegion}) => (
  <VictoryPie
    colorScale={["tomato", "orange", "gold", "cyan" ]}
    data={Object.keys(totalSoldByRegion).map(region => ({x: region, y: totalSoldByRegion[region]}))}
    events={[{
      target: "data",
      eventHandlers: {
        onMouseOver: () => {
          return [
            {
              target: "data",
              mutation: (props) => ({
                ...props,
                radius: props.radius + 20
              })
            },
            {
              target: "labels",
              mutation: (props) => ({
                ...props,
                active: true,
              })
            }
          ];
        },
        onMouseOut: () => {
          return [
            {
              target: "data",
              mutation: (props) => ({
                ...props,
                radius: props.radius - 20
              })
            },
            {
              target: "labels",
              mutation: (props) => ({
                ...props,
                active: false,
              })
            }
          ];
        }
      }
    }]}
    height={500}
    innerRadius={95}
    style={{ labels: { fontSize: 20 } }}
    labelComponent={<RegionSalesLabel />}
  />
);

export default DesktopPie;
