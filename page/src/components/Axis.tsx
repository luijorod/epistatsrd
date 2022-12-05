import { timeFormat } from "d3";

import { ScaleLinear, ScaleTime } from "../types";

export interface AxisProps {
  scale: ScaleLinear | ScaleTime;
  tickSize?: number;
  format?: (value: string | number | Date) => string;
  containerSize?: number;
  tickOffset?: number;
}

export function AxisLeft({
  containerSize,
  scale,
  tickSize = 0,
  tickOffset = 10,
}: AxisProps): JSX.Element {
  return (
    <g className="ticks-group">
      {scale.ticks().map((tickValue) => (
        <g
          key={tickValue}
          className="tick"
          transform={`translate(0, ${scale(tickValue)})`}
        >
          <line x2={containerSize} />
          <text key={tickValue} x={tickOffset} textAnchor="end">
            {tickValue}
          </text>
        </g>
      ))}
    </g>
  );
}

export function AxisTimeSeries({
  scale,
  containerSize,
  tickSize = 0,
  tickOffset = 0,
  format = timeFormat("%B"),
}: AxisProps): JSX.Element {
  return (
    <g className="ticks-group">
      {scale.ticks().map((tickValue) => (
        <g
          key={tickValue}
          className="tick"
          transform={`translate(${scale(tickValue)}, ${containerSize})`}
        >
          <line y2={tickSize} />
          <text
            key={tickValue}
            y={tickSize + tickOffset}
            dy="0.32em"
            textAnchor="middle"
          >
            {format(tickValue)}
          </text>
        </g>
      ))}
    </g>
  );
}
