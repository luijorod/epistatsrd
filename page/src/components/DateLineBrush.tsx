import { brushX, extent, scaleLinear, scaleTime, select, timeParse } from "d3";
import { useEffect, useMemo, useRef } from "react";

import { AxisTimeSeries } from "./Axis";
import { Line } from "./Line";

import { useSumBy } from "../hooks";
import { Dimensions } from "../types";

export interface DateLineBrushProps {
  dimensions: Dimensions;
  dataset: any;
  setBrushExtent: any;
}

export function DateLineBrush({
  dataset,
  dimensions,
  setBrushExtent,
}: DateLineBrushProps) {
  const sum = Array.from(useSumBy(dataset, "fecha", "casos_nuevos"));

  const { containerHeight, containerWidth, margin } = dimensions;

  const accessorX = (d) => timeParse("%d/%m/%Y")(d[0]);
  const accessorY = (d) => +d[1];

  const scaleX = useMemo(
    () =>
      scaleTime()
        .domain(extent(sum, accessorX) as Iterable<Date>)
        .range([0, containerWidth]),
    []
  );

  const scaleY = useMemo(
    () => scaleLinear().domain(extent(sum, accessorY)).range([15, 0]),
    [containerHeight]
  );

  const brushRef = useRef();

  useEffect(() => {
    const brush = brushX().extent([
      [0, 0],
      [containerWidth, containerHeight],
    ]);
    brush(select(brushRef.current));
    brush.on("brush end", ({ selection }) => {
      setBrushExtent(selection && selection.map(scaleX.invert));
    });
  }, []);

  return (
    <>
      <g transform={`translate(0,${margin.top})`}>
        <Line
          data={sum}
          dimensions={dimensions}
          xAccessor={accessorX}
          xScale={scaleX}
          yAccessor={accessorY}
          yScale={scaleY}
          stroke="black"
        />
        <AxisTimeSeries scale={scaleX} containerSize={200} />
        <g ref={brushRef} />
      </g>
    </>
  );
}
