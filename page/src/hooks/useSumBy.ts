import { useMemo } from "react";

import { sumBy } from "../utils";

export function useSumBy(data: any, key: string, accessor: string) {
  return useMemo(() => sumBy(data, key, accessor), [data, key, accessor]);
}
