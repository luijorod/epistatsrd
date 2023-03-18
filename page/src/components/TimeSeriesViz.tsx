import { AxisLeft, AxisTimeSeries } from "./Axis";
import { Line } from "./Line";
import { SVGChart } from "./SVGChart";

import { provincias as provs } from "../utils";
import { Dimensions, ScaleLinear, ScaleTime } from "../types";

interface TimeSeriesVizProps {
  dimensions: Dimensions;
  filteredDatasets: any;
  xAccessor: (d: string) => Date;
  xScale: ScaleTime;
  yAccessor: (d: string) => number;
  yScale: ScaleLinear;
  yVariable: { label: string; value: string };
}

export function TimeSeriesViz({
  filteredDatasets,
  dimensions: dims,
  xAccessor,
  xScale,
  yAccessor,
  yScale,
  yVariable,
}: TimeSeriesVizProps): JSX.Element {
  return (
    <>
      <SVGChart dimensions={dims}>
        <AxisLeft
          scale={yScale}
          tickSize={dims.containerWidth}
          textOffset={5}
          dimensions={dims}
        />
        <text
          className="axis-label"
          textAnchor="middle"
          transform={`translate(${-62},${
            dims.containerHeight / 2
          }) rotate(-90)`}
        >
          {yVariable.label}
        </text>
        <AxisTimeSeries
          dimensions={dims}
          scale={xScale}
          textOffset={15}
          tickSize={dims.containerHeight + 5}
        />
        <text
          className="axis-label"
          x={dims.containerWidth / 2}
          y={dims.containerHeight + 50}
          textAnchor="middle"
        >
          Tiempo
        </text>
        {filteredDatasets.map(
          (d) =>
            d[0]?.provincia && (
              <Line
                key={d[0].provincia}
                data={d}
                height={dims.containerHeight}
                width={dims.containerWidth}
                xAccessor={xAccessor}
                xScale={xScale}
                yAccessor={yAccessor}
                yScale={yScale}
                stroke={provs.find((p) => p.value === d[0].provincia).color}
              />
            )
        )}
      </SVGChart>
    </>
  );
}
