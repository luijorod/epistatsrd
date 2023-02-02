import { format } from "d3";

import { Dimensions, ScaleLinear, ScaleTime } from "../types";
import { esMXFormatter } from "../utils";

export interface AxisProps {
  dimensions?: Dimensions;
  format?: string;
  scale: ScaleLinear | ScaleTime;
  textTranslate?: number;
  textOffset?: number;
  tickSize?: number;
  tickTranslate?: number;
}

export function AxisLeft({
  dimensions: { containerHeight },
  scale,
  textOffset = 5,
  tickSize = 10,
}: AxisProps): JSX.Element {
  return (
    <g className="ticks-group">
      <line
        className="axis-line"
        y1={containerHeight}
        stroke="black"
        transform={`translate(0, 0)`}
      />
      {scale.ticks(6).map((tickValue) => (
        <g
          key={tickValue}
          className="tick"
          transform={`translate(0, ${scale(tickValue)})`}
        >
          <line x2={tickSize} />
          <text key={tickValue} x={-textOffset} textAnchor="end" dy=".32em">
            {format(",")(tickValue)}
          </text>
        </g>
      ))}
    </g>
  );
}

export function AxisTimeSeries({
  dimensions: { containerHeight, containerWidth },
  format = "%e %b %y",
  scale,
  textTranslate = containerHeight,
  textOffset = 0,
  tickTranslate = 0,
  tickSize = containerHeight,
}: AxisProps): JSX.Element {
  return (
    <g className="ticks-group">
      <line
        className="axis-line"
        x1={containerWidth}
        stroke="black"
        transform={`translate(0, ${containerHeight})`}
      />
      {scale.ticks(6).map((tickValue) => (
        <g
          key={tickValue}
          className="tick"
          transform={`translate(${scale(tickValue)}, ${tickTranslate})`}
        >
          <line y2={tickSize} />
          <text
            key={tickValue}
            y={textOffset}
            dy="0.32em"
            textAnchor="middle"
            transform={`translate(0, ${textTranslate})`}
          >
            {esMXFormatter(format)(tickValue)}
          </text>
        </g>
      ))}
    </g>
  );
}
