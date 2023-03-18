import { useMemo } from "react";
import { interpolate, scaleSequential } from "d3";

export function useColorScale(
  colors: [string, string],
  domain: [number, number]
) {
  return useMemo(
    () =>
      scaleSequential()
        .interpolator(interpolate(colors[0], colors[1]))
        .domain([...domain]),
    [colors, domain]
  );
}
