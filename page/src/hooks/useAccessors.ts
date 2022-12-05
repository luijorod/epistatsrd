import { useMemo } from "react";
import { timeParse } from "d3";

export function useAccessors(
  formatString: string,
  xVariable: string,
  yVariable: string
): [(any) => Date, (any) => number] {
  let [xAccessor, yAccessor] = useMemo(() => {
    const parseDate = timeParse(formatString);
    const xAccessor = (d) => parseDate(d[xVariable]);
    const yAccessor = (d) => +d[yVariable];

    return [xAccessor, yAccessor];
  }, [formatString, xVariable, yVariable]);

  return [xAccessor, yAccessor];
}
