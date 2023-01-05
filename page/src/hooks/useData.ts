import { Dispatch, SetStateAction, useState } from "react";

import { datasetVars } from "../utils";

import colera from "../assets/col.csv";
import covid from "../assets/cov.csv";
import dengue from "../assets/den.csv";
import leptospirosis from "../assets/lep.csv";
import malaria from "../assets/mal.csv";
import mmi from "../assets/mmi.csv";

interface UseData {
  data: any;
  dataset: any;
  datasetVars: any;
  datasets: any[];
  setData: Dispatch<SetStateAction<any>>;
  setDatasets: Dispatch<SetStateAction<any>>;
}

function getDataset(dataset: string = "covid"): any {
  switch (dataset) {
    case "colera":
      return [colera, datasetVars.colera];
    case "covid":
      return [covid, datasetVars.covid];
    case "dengue":
      return [dengue, datasetVars.dengue];
    case "leptospirosis":
      return [leptospirosis, datasetVars.leptospirosis];
    case "malaria":
      return [malaria, datasetVars.malaria];
    case "mmi":
      return [mmi, datasetVars.mmi];
    default:
      break;
  }
}

export function useData(datasetString: string = "covid"): UseData {
  const [dataset, datasetVars] = getDataset(datasetString);
  const [data, setData] = useState(dataset);
  const [datasets, setDatasets] = useState([dataset]);

  return { data, dataset, datasetVars, datasets, setData, setDatasets };
}
