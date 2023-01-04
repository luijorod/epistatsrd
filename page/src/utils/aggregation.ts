import { rollup, sum } from "d3";

export function sumBy(data: any, key: string, accessor: string) {
  return rollup(
    data,
    (array) => sum(array, (d) => +d[accessor]),
    (d) => d[key]
  );
}
