import { useState } from "react";
import { extent as d3extent } from "d3";
import Select from "react-select";

import { AxisLeft, AxisTimeSeries } from "./Axis";
import { Line } from "./Line";
import { SVGChart } from "./SVGChart";

import {
  useAccessors,
  useData,
  useDimensions,
  useFilter,
  useScales,
} from "../hooks";
import { colors, downloadDataset, provincias as provs } from "../utils";

import { DateLineBrush } from "./DateLineBrush";

export function TimeSeries() {
  // Data and Accessors
  const { data, dataset, datasetVars, setData, datasets, setDatasets } =
    useData("covid");

  // Current selected [provinces]
  const [provincias, setProvincias] = useState([provs[0]]);
  // Current selected Y variable
  const [yVariable, setYVariable] = useState(datasetVars[0]);
  // Current
  const [brushExtent, setBrushExtent] = useState();

  const [xAccessor, yAccessor] = useAccessors(
    "%d/%m/%Y",
    "fecha",
    yVariable.value
  );

  // Dimensions and Scales
  const [dims] = useDimensions();
  const [scalesExtent, setScalesExtent] = useState({
    x: d3extent(dataset, xAccessor),
    y: d3extent(dataset, yAccessor),
  });
  const [xScale, yScale] = useScales(scalesExtent, dims, xAccessor, yAccessor);

  function handleProvinciasChange(newProvincias) {
    setProvincias(newProvincias);
  }

  // TODO: Refactor yVariable scale change
  function handleYVariableChange(newValue) {
    setYVariable(newValue);
  }

  useFilter(
    brushExtent,
    dataset,
    provincias,
    setScalesExtent,
    setData,
    setDatasets,
    xAccessor,
    yAccessor
  );

  return (
    <>
      <div className="container flex justify-evenly justify-items-center mx-auto">
        <div className="">
          <Select
            closeMenuOnSelect={false}
            defaultValue={provs[0]}
            onChange={handleProvinciasChange}
            options={provs}
            isMulti
          />
        </div>
        <div className="">
          <Select
            closeMenuOnSelect={true}
            defaultValue={datasetVars[0]}
            onChange={handleYVariableChange}
            options={datasetVars}
          />
        </div>
      </div>
      <SVGChart dimensions={dims}>
        <AxisLeft
          scale={yScale}
          tickSize={5}
          tickOffset={0}
          containerSize={dims.containerWidth}
        />
        <text
          className="axis-label"
          textAnchor="middle"
          transform={`translate(${-40},${
            dims.containerHeight / 2
          }) rotate(-90)`}
        >
          {yVariable.label}
        </text>
        <AxisTimeSeries
          containerSize={dims.containerHeight}
          scale={xScale}
          tickOffset={10}
          tickSize={10}
        />
        <text
          className="axis-label"
          x={dims.containerWidth / 2}
          y={dims.containerHeight + 55}
          textAnchor="middle"
        >
          Tiempo
        </text>
        {datasets.map((dataset, i) => (
          <Line
            key={dataset[0].provincia}
            data={dataset}
            dimensions={dims}
            xAccessor={xAccessor}
            xScale={xScale}
            yAccessor={yAccessor}
            yScale={yScale}
            stroke={colors[i]}
          />
        ))}
        <g transform={`translate(0, ${dims.containerHeight})`}>
          <DateLineBrush
            dataset={dataset}
            dimensions={dims}
            setBrushExtent={setBrushExtent}
          />
        </g>
      </SVGChart>
      <button onClick={() => downloadDataset(data)}>Descargar datos</button>
    </>
  );
}
