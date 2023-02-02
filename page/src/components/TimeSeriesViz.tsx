import { useState } from "react";
import { BsDownload } from "react-icons/bs";

import { AxisLeft, AxisTimeSeries } from "./Axis";
import { DateLineBrush } from "./DateLineBrush";
import { Line } from "./Line";
import { SVGChart } from "./SVGChart";

import {
  useDateAccessor,
  useDomain,
  useFilter,
  useNumericAccessor,
  useLinearScale,
  useTimeScale,
} from "../hooks";
import { downloadDataset, provincias as provs } from "../utils";
import { Dimensions } from "../types";

interface TimeSeriesVizProps {
  dataset: any;
  datasetVars: {
    dateFormatString: string;
    dateVar: string;
    vars: { label: string; value: string }[];
  };
  dimensions: Dimensions;
  provincias: string[];
  yVariable: { label: string; value: string };
}

export function TimeSeriesViz({
  dataset,
  datasetVars,
  dimensions: dims,
  provincias,
  yVariable,
}: TimeSeriesVizProps): JSX.Element {
  // Destructure datasetVars
  const { dateFormatString, dateVar } = datasetVars;

  // X and Y accessors
  const xAccessor = useDateAccessor(dateVar, dateFormatString);
  const yAccessor = useNumericAccessor(yVariable.value);

  // Currently selected time period
  const [brushExtent, setBrushExtent] = useState();

  const [filteredDataset, filteredDatasets] = useFilter(
    brushExtent,
    dataset,
    xAccessor,
    provincias
  );

  // Scales for the main graph
  const xDomain = useDomain<Date>(filteredDataset, xAccessor);
  const yDomain = useDomain<number>(filteredDataset, yAccessor);
  const xScale = useTimeScale(xDomain, [0, dims.containerWidth]);
  const yScale = useLinearScale(yDomain, [dims.containerHeight, 0]);

  return (
    <>
      <div className="container flex flex-col justify-items-center">
        <SVGChart dimensions={dims}>
          <AxisLeft
            scale={yScale}
            tickSize={dims.containerWidth}
            textOffset={5}
            dimensions={dims}
          />
          <text
            className="axis-label"
            textAnchor="middle"
            transform={`translate(${-62},${
              dims.containerHeight / 2
            }) rotate(-90)`}
          >
            {yVariable.label}
          </text>
          <AxisTimeSeries
            dimensions={dims}
            scale={xScale}
            textOffset={15}
            tickSize={dims.containerHeight + 5}
          />
          <text
            className="axis-label"
            x={dims.containerWidth / 2}
            y={dims.containerHeight + 55}
            textAnchor="middle"
          >
            Tiempo
          </text>
          {filteredDatasets.map(
            (d) =>
              d[0]?.provincia && (
                <Line
                  key={d[0].provincia}
                  data={d}
                  height={dims.containerHeight}
                  width={dims.containerWidth}
                  xAccessor={xAccessor}
                  xScale={xScale}
                  yAccessor={yAccessor}
                  yScale={yScale}
                  stroke={provs.find((p) => p.value === d[0].provincia).color}
                />
              )
          )}
          <g transform={`translate(0, ${dims.containerHeight + 75})`}>
            <DateLineBrush
              dataset={dataset}
              dimensions={dims}
              formatString={dateFormatString}
              dateVariable={dateVar}
              yVariable={yVariable.value}
              setBrushExtent={setBrushExtent}
            />
          </g>
        </SVGChart>
        <div className="flex mx-auto justify-between items-center rounded-md bg-sky-700 px-3 py-2 text-white w-fit space-x-2 font-bold">
          <div>
            <button
              onClick={() => downloadDataset(filteredDataset)}
              className="font-bold"
            >
              Descargar CSV
            </button>
          </div>
          <div>
            <BsDownload />
          </div>
        </div>
      </div>
    </>
  );
}
