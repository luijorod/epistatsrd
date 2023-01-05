import {
  bin,
  brushX,
  select,
  sum,
  timeMonths,
  scaleLinear,
  max,
  scaleTime,
  extent,
} from "d3";
import { useEffect, useMemo, useRef } from "react";
import { Dimensions } from "../types";
import { AxisTimeSeries } from "./Axis";

export interface DateHistogramProps {
  dimensions: Dimensions;
  dataset: any;
  xAccessor: any;
  yAccessor: any;
  setBrushExtent: any;
}

export function DateHistogram({
  dataset,
  dimensions: { containerHeight, containerWidth, margin },
  setBrushExtent,
  xAccessor,
  yAccessor,
}: DateHistogramProps) {
  const scaleX = useMemo(
    () =>
      scaleTime()
        .domain(extent(dataset, xAccessor) as Iterable<Date>)
        .range([0, containerWidth]),
    []
  );

  const binnedData = useMemo(() => {
    const [start, stop] = scaleX.domain();

    const getBins = bin()
      .value(xAccessor)
      .domain([start.getTime(), stop.getTime()])
      .thresholds(timeMonths(start, stop));

    return getBins(dataset).map((d) => ({
      y: sum(d, yAccessor),
      x0: d.x0,
      x1: d.x1,
    }));
  }, [dataset, xAccessor, scaleX, yAccessor]);

  const brushRef = useRef();

  const yScale = useMemo(
    () =>
      scaleLinear()
        .domain([0, max(binnedData, (d) => d.y)])
        .range([15, 0]),
    [binnedData, containerHeight]
  );

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
        {binnedData.map((d, i) => (
          <rect
            key={i}
            className="mark"
            x={scaleX(d.x0)}
            y={yScale(d.y)}
            width={scaleX(d.x1) - scaleX(d.x0)}
            height={containerHeight - yScale(d.y)}
          />
        ))}
        <g ref={brushRef} />
        <AxisTimeSeries scale={scaleX} containerSize={200} />
      </g>
    </>
  );
}
