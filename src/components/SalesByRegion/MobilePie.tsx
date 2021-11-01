import React from "react";
import { VictoryLabel, VictoryPie, VictoryLabelProps } from "victory";
import { PieProps } from './index';

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

const MobilePie:React.FC<PieProps> = ({ totalSoldByRegion}) => (
  <VictoryPie
        colorScale={["tomato", "orange", "gold", "cyan" ]}
        data={Object.keys(totalSoldByRegion).map(region => ({x: region, y: totalSoldByRegion[region]}))}
        height={500}
        style={{ labels: { fontSize: 20 } }}
        labelComponent={<RegionSalesMobileLabel />}
      />
);


export default MobilePie;
