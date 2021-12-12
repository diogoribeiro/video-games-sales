import React from "react";
import {
  VictoryAxis,
  VictoryBar,
  VictoryBarProps,
  VictoryChart,
  VictoryTooltip,
} from "victory";
import { VictoryBarTTargetType } from "victory-bar";
import { EventPropTypeInterface } from "victory-core";
import { orange800, purple800, white } from "../../utils/theme";
import coin from "./coins.png";

const Coins: React.FC = () => (
  <defs>
    <pattern
      id="coins"
      x="0"
      y="0"
      patternUnits="userSpaceOnUse"
      width="30"
      height="30"
    >
      <image href={coin} x="0" y="0" width="30" height="30" />
    </pattern>
    <pattern id="bar" x="0" y="0" width="1" height="1">
      <rect width="100%" height="100%" fill="url(#coins)" />
    </pattern>
  </defs>
);

interface Props extends VictoryBarProps {
  onClick?: (props: any) => any;
  labelX: string;
  labelY: string;
}

const axisStyles = {
  axis: {
    stroke: purple800,
  },
  axisLabel: {
    fill: orange800,
    fontSize: 8,
    fontStyle: "italic",
    padding: 24,
  },
  grid: {
    stroke: purple800,
    opacity: 0.2,
  },
  tickLabels: {
    fontSize: 8,
    fill: purple800,
  },
};

const axisXStyles = {
  ...axisStyles,
  axisLabel: {
    ...axisStyles.axisLabel,
    padding: 36,
  },
};

const tooltipFlyoutStyles = {
  fill: white,
  stroke: purple800,
  strokeWidth: 1,
};

const tooltipStyles = {
  fontSize: 8,
};

function barStyles(isOnClickEnabled: boolean) {
  return {
    data: {
      fill: "url(#bar)",
      cursor: isOnClickEnabled ? "pointer" : "",
    },
  };
}

const SalesGraph: React.FC<Props> = ({
  data,
  onClick,
  labelX,
  labelY,
  children,
}) => {
  const events: EventPropTypeInterface<
    VictoryBarTTargetType,
    number | string | number[] | string[]
  >[] = [];
  const isOnClickEnabled = !!onClick;

  if (isOnClickEnabled) {
    events.push({
      target: "data",
      eventHandlers: {
        onClick: () => ({
          target: "data",
          mutation: onClick,
        }),
      },
    });
  }

  return (
    <VictoryChart domainPadding={20} height={250}>
      {children}
      <VictoryAxis style={axisXStyles} label={labelY} dependentAxis />
      <VictoryAxis style={axisStyles} label={labelX} />
      <Coins />
      <VictoryBar
        data={data}
        barWidth={30}
        labels={({ datum }) => `${datum.y.toFixed(2)}MM`}
        labelComponent={
          <VictoryTooltip
            flyoutPadding={4}
            flyoutStyle={tooltipFlyoutStyles}
            style={tooltipStyles}
          />
        }
        style={barStyles(isOnClickEnabled)}
        events={events}
      />
    </VictoryChart>
  );
};

export default SalesGraph;
