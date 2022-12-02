import { bin, brushX, select, sum, timeMonths } from "d3";
import { useEffect, useMemo, useRef } from "react";
import { Dimensions, ScaleLinear, ScaleTime } from "../types";

export interface DateHistogramProps {
  dimensions: Dimensions;
  data: any;
  xAccessor: any;
  yAccessor: any;
  xScale: ScaleTime;
  yScale: ScaleLinear;
  setBrushExtent: any;
}

export function DateHistogram({
  data,
  dimensions: { containerHeight, containerWidth, margin },
  setBrushExtent,
  xAccessor,
  xScale,
  yAccessor,
  yScale,
}: DateHistogramProps) {
  const binnedData = useMemo(() => {
    const [start, stop] = xScale.domain();
    const getBins = bin()
      .value(xAccessor)
      .domain([start.getTime(), stop.getTime()])
      .thresholds(timeMonths(start, stop));

    return getBins(data).map((d) => ({
      y: sum(d, yAccessor),
      x0: d.x0,
      x1: d.x1,
    }));
  }, [data, xAccessor, xScale, yAccessor]);

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
  }, []);

  return (
    <svg>
      <rect
        height={containerHeight}
        width={containerWidth}
        fill="gray"
        opacity={0.5}
      />
      <g transform={`translate(${margin.left},${margin.top})`}>
        {binnedData.map((d, i) => (
          <rect
            key={i}
            className="mark"
            x={xScale(d.x0)}
            y={yScale(d.y)}
            width={xScale(d.x1) - xScale(d.x0)}
            height={containerHeight - yScale(d.y)}
          >
            <title>{d.y}</title>
          </rect>
        ))}
        <g ref={brushRef} />
      </g>
    </svg>
  );
}
