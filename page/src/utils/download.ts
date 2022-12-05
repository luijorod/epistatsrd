import { saveAs } from "file-saver";

function datasetToCSV(data: any): string {
  let content = Object.keys(data[0]).join(",") + "\n";
  data.map((d) => {
    content += Object.values(d).join(",").trim() + "\n";
  });
  return content;
}

export function downloadDataset(data: any): void {
  const content = datasetToCSV(data);
  var blob = new Blob([content], {
    type: "text/csv;charset=utf-8",
  });
  saveAs(blob, "dataset.csv");
}
