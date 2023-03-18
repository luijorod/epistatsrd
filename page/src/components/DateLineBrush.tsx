import { useEffect, useRef } from "react";
import { brushX, select } from "d3";

import { AxisTimeSeries } from "./Axis";
import { Line } from "./Line";

import {
  useDateAccessor,
  useDomain,
  useNumericAccessor,
  useLinearScale,
  useSumBy,
  useTimeScale,
} from "../hooks";
import { Dimensions } from "../types";

export interface DateLineBrushProps {
  dataset: any;
  dateVariable: string;
  dimensions: Dimensions;
  formatString: string;
  setBrushExtent: any;
  yVariable: string;
}

export function DateLineBrush({
  dataset,
  dateVariable,
  dimensions,
  formatString,
  setBrushExtent,
  yVariable,
}: DateLineBrushProps) {
  // Destructure dimensions
  const { containerHeight, containerWidth } = dimensions;

  // Aggregate yVariable by dateVariable
  const sum = Array.from(useSumBy(dataset, dateVariable, yVariable));

  // "1" is the aggregated sum for "0" date
  const xAccessor = useDateAccessor("0", formatString);
  const yAccessor = useNumericAccessor("1");

  const xDomain = useDomain<Date>(sum, xAccessor);
  const yDomain = useDomain<number>(sum, yAccessor);

  const xScale = useTimeScale(xDomain, [0, containerWidth]);
  const yScale = useLinearScale(yDomain, [15, 0]);

  const brushRef = useRef();

  useEffect(() => {
    const brush = brushX().extent([
      [0, 0],
      [containerWidth, containerHeight],
    ]);
    brush(select(brushRef.current));
    brush.on("brush end", ({ selection }) => {
      setBrushExtent(selection && selection.map(xScale.invert));
    });
  }, [dataset]);

  return (
    <>
      <AxisTimeSeries
        dimensions={dimensions}
        scale={xScale}
        textTranslate={40}
        tickSize={20}
      />
      <Line
        data={sum}
        height={200}
        width={containerWidth}
        xAccessor={xAccessor}
        xScale={xScale}
        yAccessor={yAccessor}
        yScale={yScale}
        stroke="black"
      />
      <line stroke="#e6e6e6" y1={20} y2={20} x2={dimensions.containerWidth} />
      <g ref={brushRef} />
    </>
  );
}
