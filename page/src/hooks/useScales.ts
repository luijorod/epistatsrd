import { useMemo } from "react";
import { extent, scaleLinear, scaleTime } from "d3";
import { ScaleLinear, ScaleTime } from "../types";

export function useDomain<T>(dataset: any, accessor) {
  const domain = useMemo(() => {
    return extent(dataset, accessor) as [T, T];
  }, [dataset, accessor]);

  return domain;
}

export function useLinearScale(
  domain: [number, number],
  range: [number, number]
): ScaleLinear {
  const scale = useMemo(
    () => scaleLinear().domain(domain).range(range),
    [domain, range]
  );

  return scale;
}

export function useTimeScale(
  domain: [Date, Date],
  range: [number, number]
): ScaleTime {
  const scale = useMemo(
    () => scaleTime().domain(domain).range(range),
    [domain, range]
  );

  return scale;
}
