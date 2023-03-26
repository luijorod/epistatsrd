import { useEffect, useState } from "react";

import { csv, DSVRowArray } from "d3";
import { useQuery } from "react-query";

import { datasetVars as vars } from "../utils";

export function useData(datasetString: string = "covid") {
  // 1. dataset: Tracks scales (useExtent), filter by date and province (useFilter),
  // and brushing by dates (DateLineBrush)
  // 2. datasetVars: Holds dateFormatString and dateVar to define accessors
  // (DateLineBrush, useAccessors), and vars to populate Y variables
  const datasetVars = vars[datasetString];
  const [dataset, setDataset] = useState([]);

  const { isFetched, data } = useQuery(
    ["dataset", datasetString],
    () => csv(datasetVars.url).then((res) => res),
    { initialData: [] as DSVRowArray }
  );

  useEffect(() => {
    setDataset(data);
  }, [datasetString, isFetched]);

  return { dataset, datasetVars, isFetched };
}
