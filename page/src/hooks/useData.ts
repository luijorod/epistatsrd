import { Dispatch, SetStateAction, useState } from "react";

import covid from "../assets/covid_data.csv";

interface UseData {
  dataset: any;
  data: any;
  datasets: any[];
  setData: Dispatch<SetStateAction<any>>;
  setDatasets: Dispatch<SetStateAction<any>>;
}

function getDataset(dataset: string = "covid"): any {
  switch (dataset) {
    case "covid":
      return covid;
    default:
      break;
  }
}

export function useData(datasetString: string = "covid"): UseData {
  const dataset = getDataset(datasetString);
  const [data, setData] = useState(dataset);
  const [datasets, setDatasets] = useState([dataset]);

  return { dataset, data, datasets, setData, setDatasets };
}
