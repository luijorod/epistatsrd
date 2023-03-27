import { useEffect, useState } from "react";

import { format } from "d3";
import Select from "react-select";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

import { DateLineBrush } from "./DateLineBrush";
import { DownloadButton } from "./DownloadButton";
import { TimeSeriesViz } from "./TimeSeriesViz";

import {
  useColorScale,
  useData,
  useDateAccessor,
  useDimensions,
  useDomain,
  useFilter,
  useLinearScale,
  useNumericAccessor,
  useSumBy,
  useTimeScale,
} from "../hooks";

import { ProvinciaValor } from "../types";

import {
  datasets as avlblDatasets,
  provincias as provs,
  provinciasWhiteColor,
} from "../utils";

import { DRSVGMap } from "../assets/DRSVGMap";

export function VizContainer(): JSX.Element {
  // Currently selected dataset
  const [currentDataset, setCurrentDataset] = useState(avlblDatasets[0].value);
  const { dataset, datasetVars, isFetched } = useData(currentDataset);
  const { dateFormatString, dateVar, vars } = datasetVars;

  // Currently selected [provincias]
  const [provincias, setProvincias] = useState([provs[0]]);

  // Currently selected Y variable
  const [yVariable, setYVariable] = useState(vars[0]);

  // Dimensions
  const [dims] = useDimensions();

  function handleCurrentDataset(newDataset) {
    setCurrentDataset(newDataset.value);
  }

  function handleProvinciasChange(newProvincias) {
    setProvincias(newProvincias);
  }

  function handleYVariableChange(newYVariable) {
    setYVariable(newYVariable);
  }

  useEffect(() => {
    setYVariable(vars[0]);
  }, [currentDataset]);

  // TimeSeriesViz
  // X and Y accessors
  const xAccessor = useDateAccessor(dateVar, dateFormatString);
  const yAccessor = useNumericAccessor(yVariable.value);

  // Currently selected time period
  const [brushExtent, setBrushExtent] = useState();

  const [filteredDataset, filteredDatasets] = useFilter(
    brushExtent,
    dataset,
    xAccessor,
    provincias.map((p) => p.value)
  );

  // Scales for the main graph
  const xDomain = useDomain<Date>(filteredDataset, xAccessor);
  const yDomain = useDomain<number>(filteredDataset, yAccessor);
  const xScale = useTimeScale(xDomain, [0, dims.containerWidth]);
  const yScale = useLinearScale(yDomain, [dims.containerHeight, 0]);

  const acumuladoProvs = useSumBy(
    filteredDataset,
    "provincia",
    yVariable.value
  );
  const sumDomain = useDomain<number>(acumuladoProvs, (d) => d[1]);
  const colorScale = useColorScale(["white", "red"], sumDomain);
  const acumuladoArray: ProvinciaValor[] = [];
  acumuladoProvs.forEach((v, k) => {
    acumuladoArray.push({ provincia: k, valor: v });
  });

  return (
    <>
      {/* Menus de Datasets, Provincias e Indicadores */}
      <div className="flex flex-col md:flex-row justify-evenly py-5 bg-gray-100">
        <div className="min-w-fit mx-5">
          <span className="font-bold">Dataset</span>
          <Select
            closeMenuOnSelect={true}
            defaultValue={avlblDatasets[0]}
            onChange={handleCurrentDataset}
            options={avlblDatasets}
          />
        </div>
        <div className="mx-5">
          <span className="font-bold">Provincias</span>
          <div className="flex min-w-fit text-xs">
            <Select
              closeMenuOnSelect={false}
              value={provincias}
              onChange={handleProvinciasChange}
              options={provs}
              isMulti
              styles={{
                multiValueLabel: (styles, { data }) => ({
                  ...styles,
                  backgroundColor: data.color,
                  color: provinciasWhiteColor.includes(data.value)
                    ? "white"
                    : "black",
                }),
              }}
            />
            <button
              onClick={() => setProvincias(provs)}
              className="text-xs rounded-md bg-blue-700 px-3 py-2 text-white ml-2"
            >
              Todas
            </button>
            <button
              onClick={() => setProvincias([])}
              className="text-xs rounded-md bg-red-700 p-2 text-white ml-2"
            >
              Ninguna
            </button>
          </div>
        </div>
        <div className="min-w-fit mx-5">
          <span className="font-bold">Indicador</span>
          <Select
            closeMenuOnSelect={true}
            onChange={handleYVariableChange}
            options={vars}
            value={yVariable}
          />
        </div>
      </div>

      {/* Tabs Gráfica, Heatmap, Tabla */}
      <div className="flex flex-col items-center justify-center">
        <Tabs className="my-5">
          <TabList className="flex items-center justify-center space-x-10 mb-5">
            <Tab className="border-2 border-b-0 rounded-t-xl px-3 py-2 focus:bg-black focus:text-white">
              Gráfica
            </Tab>
            <Tab className="border-2 border-b-0 rounded-t-xl px-3 py-2 focus:bg-black focus:text-white">
              Heatmap
            </Tab>
            <Tab className="border-2 border-b-0 rounded-t-xl px-3 py-2 focus:bg-black focus:text-white">
              Tabla
            </Tab>
          </TabList>
          {!isFetched ? (
            <span>Cargando datos...</span>
          ) : (
            <>
              <TabPanel>
                <TimeSeriesViz
                  dimensions={dims}
                  filteredDatasets={filteredDatasets}
                  xAccessor={xAccessor}
                  xScale={xScale}
                  yAccessor={yAccessor}
                  yScale={yScale}
                  yVariable={yVariable}
                />
              </TabPanel>
              <TabPanel>
                <DRSVGMap
                  dimensions={dims}
                  scale={colorScale}
                  values={acumuladoProvs}
                  setProvincias={setProvincias}
                />
              </TabPanel>
              <TabPanel>
                <table className="min-w-full text-left">
                  <thead className="bg-black text-white font-bold">
                    <tr>
                      <th className="p-1.5">Provincia</th>
                      <th>{yVariable.label}</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {acumuladoArray.map((pv, i) => (
                      <tr
                        key={pv.provincia}
                        className={
                          (i % 2 === 0 && "bg-gray-100") +
                          " hover:bg-yellow-100"
                        }
                      >
                        <td className="p-1" key={pv.provincia}>
                          {pv.provincia}
                        </td>
                        <td key={pv.valor}>{format(",")(pv.valor)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TabPanel>
            </>
          )}
        </Tabs>

        {/* Filtro de línea temporal */}
        <svg height={50} width={dims.containerWidth + 50} className="bg-white">
          <g transform={`translate(50, 0)`}>
            <DateLineBrush
              dataset={dataset}
              dimensions={dims}
              formatString={dateFormatString}
              dateVariable={dateVar}
              yVariable={yVariable.value}
              setBrushExtent={setBrushExtent}
            />
          </g>
        </svg>

        {/* Botones de descarga */}
        <div className="flex my-5 tex-sm">
          <div className="mx-8">
            <DownloadButton data={filteredDataset} format={"csv"} />
          </div>
          <div className="mx-8">
            <DownloadButton data={filteredDataset} format={"json"} />
          </div>
        </div>
      </div>
    </>
  );
}
