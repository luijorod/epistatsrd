import { useMemo } from "react";
import { timeParse } from "d3";

export function useDateAccessor(dateVariable: string, formatString: string) {
  const accessor = useMemo(() => {
    const parseDate = timeParse(formatString);

    return (d: string) => parseDate(d[dateVariable]);
  }, [formatString, dateVariable]);

  return accessor;
}

export function useNumericAccessor(variable: string) {
  // Cast d[variable] to numeric type
  return useMemo(() => (d: string) => +d[variable], [variable]);
}
