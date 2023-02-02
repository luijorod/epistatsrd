import { useEffect, useState } from "react";
import Select from "react-select";

import { TimeSeriesViz } from "./TimeSeriesViz";

import { useData, useDimensions } from "../hooks";
import { datasets as avlblDatasets, provincias as provs } from "../utils";

export function TimeSeriesContainer(): JSX.Element {
  // Currently selected dataset
  const [currentDataset, setCurrentDataset] = useState(avlblDatasets[1].value);
  const { dataset, datasetVars } = useData(currentDataset);

  // Currently selected [provincias]
  const [provincias, setProvincias] = useState([provs[0]]);

  // Currently selected Y variable
  const [yVariable, setYVariable] = useState(datasetVars.vars[0]);

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
    setYVariable(datasetVars.vars[0]);
  }, [currentDataset]);

  const provinciasWhiteColor = [
    "Baoruco",
    "Barahona",
    "Dajabón",
    "Distrito Nacional",
    "El Seibo",
    "San José de Ocoa",
    "San Juan",
    "San Pedro de Macorís",
    "Santiago",
    "Valverde",
  ];

  return (
    <>
      <div className="container flex justify-evenly justify-items-center mx-auto">
        <div className="">
          <Select
            closeMenuOnSelect={true}
            defaultValue={avlblDatasets[1]}
            onChange={handleCurrentDataset}
            options={avlblDatasets}
          />
        </div>
        <div className="">
          <Select
            closeMenuOnSelect={false}
            defaultValue={provs[0]}
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
                fontWeight: "bolder",
              }),
            }}
          />
        </div>
        <div className="">
          <Select
            closeMenuOnSelect={true}
            onChange={handleYVariableChange}
            options={datasetVars.vars}
            value={yVariable}
          />
        </div>
      </div>
      <TimeSeriesViz
        dataset={dataset}
        datasetVars={datasetVars}
        dimensions={dims}
        provincias={provincias.map((p) => p.value)}
        yVariable={yVariable}
      />
    </>
  );
}
