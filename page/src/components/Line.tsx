import { curveLinear, line } from "d3";
import { ScaleLinear, ScaleTime } from "../types";

export interface LineProps {
  data: any;
  height: number;
  width: number;
  stroke: string;
  xAccessor: any;
  xScale: ScaleTime;
  yAccessor: any;
  yScale: ScaleLinear;
}

export function Line({
  data,
  height,
  width,
  stroke,
  xAccessor,
  xScale,
  yAccessor,
  yScale,
  ...rest
}: LineProps): JSX.Element {
  const lineGenerator = line()
    .curve(curveLinear)
    .x((d) => xScale(xAccessor(d)))
    .y((d) => yScale(yAccessor(d)));

  return (
    <path
      height={height}
      width={width}
      d={lineGenerator(data)}
      stroke={stroke}
      fill="none"
      {...rest}
    />
  );
}
