import { ReactNode } from "react";
import { Dimensions } from "../types";

export interface SVGChartProps {
  children?: ReactNode;
  dimensions: Dimensions;
}

export function SVGChart({
  children,
  dimensions: { height, width, margin },
}: SVGChartProps): JSX.Element {
  return (
    <svg width={width} height={height} className="chart">
      <g transform={`translate(${margin.left}, ${margin.top})`}>{children}</g>
    </svg>
  );
}
