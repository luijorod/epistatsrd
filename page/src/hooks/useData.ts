import { datasetVars } from "../utils";

import colera from "../assets/col.csv";
import covid from "../assets/cov.csv";
import dengue from "../assets/den.csv";
import leptospirosis from "../assets/lep.csv";
import malaria from "../assets/mal.csv";
import mmi from "../assets/mmi.csv";

function getDatasetAndVars(dataset: string = "covid"): any {
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

export function useData(datasetString: string = "covid") {
  // 1. dataset: Tracks scales (useExtent), filter by date and province (useFilter),
  // and brushing by dates (DateLineBrush)
  // 2. datasetVars: Holds dateFormatString and dateVar to define accessors
  // (DateLineBrush, useAccessors), and vars to populate Y variables
  const [dataset, datasetVars] = getDatasetAndVars(datasetString);

  return { dataset, datasetVars };
}
