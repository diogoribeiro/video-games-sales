import React from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react'
import { VictoryLabel, VictoryPie, VictoryTooltip, VictoryLabelProps } from "victory";
import GraphContainer from "./GraphContainer";
import { SalesInfo, PlataformsSales } from '../types';

type SalesByRegionProps = {
  sales: SalesInfo[],
  platformName: string,
}

type PieProps = {
  totalSoldByRegion: PlataformsSales,
}

function isMobile() {
  return /Android|iPhone/i.test(navigator.userAgent)
}

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

const RegionSalesMobileLabel: React.FC<VictoryLabelProps> = (props) => {
  const {children, ...labelProps} = props;
  // @ts-ignore
  const label = labelProps.datum && labelProps.datum.y ?
    // @ts-ignore
    `${labelProps.text}\n${labelProps.datum.y.toFixed(2)} sales` :
    labelProps.text;

  return (
    <React.Fragment>
      <g>
        <VictoryLabel
          {...labelProps}
          angle={-45}
          text={label}
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

const MobilePie:React.FC<PieProps> = ({ totalSoldByRegion}) => (
  <VictoryPie
        colorScale={["tomato", "orange", "gold", "cyan" ]}
        data={Object.keys(totalSoldByRegion).map(region => ({x: region, y: totalSoldByRegion[region]}))}
        height={500}
        style={{ labels: { fontSize: 20 } }}
        labelComponent={<RegionSalesMobileLabel />}
      />
);

const SalesByRegion: React.FC<SalesByRegionProps>= ({ sales, platformName }) =>  {
  let totalSoldByRegion = sales
    .filter(sale => sale.Platform === platformName)
    .reduce((plataforms:PlataformsSales, sale) => {
      plataforms['EU'] += parseFloat(sale.EU_Sales) || 0;
      plataforms['North America'] += parseFloat(sale.NA_Sales) || 0;
      plataforms['Japan'] += parseFloat(sale.JP_Sales) || 0;
      plataforms['Others'] += parseFloat(sale.Other_Sales) || 0;

      return plataforms;
    }, {
      'EU': 0,
      'North America': 0,
      'Japan': 0,
      'Others': 0,
    });

  return (
    <GraphContainer
      css={{
        height: '300px',
        width: '500px',
        maxWidth: '100%',
      }}
      subtitle="Sales by region"
    >
      {isMobile() ?
        <MobilePie totalSoldByRegion={totalSoldByRegion} />:
        <DesktopPie totalSoldByRegion={totalSoldByRegion} />
      }
    </GraphContainer>
  );
}

export default SalesByRegion;
