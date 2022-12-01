import { useMemo } from "react";
import { scaleLinear, scaleTime } from "d3";
import { Dimensions, ScaleLinear, ScaleTime } from "../types";

export function useScales(
  extent: any,
  dimensions: Dimensions,
  xAccessor: any,
  yAccessor: any
): [ScaleTime, ScaleLinear] {
  const [xScale, yScale] = useMemo(() => {
    const xScale: ScaleTime = scaleTime()
      .domain(extent.x as Iterable<Date>)
      .range([0, dimensions.containerWidth]);

    const yScale: ScaleLinear = scaleLinear()
      .domain(extent.y as Iterable<number>)
      .range([dimensions.containerHeight, 0])
      .nice();
    return [xScale, yScale];
  }, [extent, dimensions, xAccessor, yAccessor]);

  return [xScale, yScale];
}
