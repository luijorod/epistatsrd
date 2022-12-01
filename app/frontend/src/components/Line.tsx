import { curveNatural, line } from "d3";
import { Dimensions, ScaleLinear, ScaleTime } from "../types";

export interface LineProps {
  data: any;
  dimensions: Dimensions;
  stroke: string;
  xAccessor: any;
  xScale: ScaleTime;
  yAccessor: any;
  yScale: ScaleLinear;
}

export function Line({
  data,
  dimensions: { containerHeight, containerWidth },
  stroke,
  xAccessor,
  xScale,
  yAccessor,
  yScale,
  ...rest
}: LineProps): JSX.Element {
  const lineGenerator = line()
    .curve(curveNatural)
    .x((d) => xScale(xAccessor(d)))
    .y((d) => yScale(yAccessor(d)));

  return (
    <path
      d={lineGenerator(data)}
      height={containerHeight}
      width={containerWidth}
      stroke={stroke}
      {...rest}
      fill="none"
    />
  );
}
