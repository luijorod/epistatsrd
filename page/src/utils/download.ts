import { saveAs } from "file-saver";

function datasetToCSV(data: any): string {
  let content = Object.keys(data[0]).join(",") + "\n";
  data.map((d) => {
    content += Object.values(d).join(",").trim() + "\n";
  });
  return content;
}

export function downloadDataset(data: any, format = "csv"): void {
  const content =
    format === "csv" ? datasetToCSV(data) : JSON.stringify(data, null, 2);
  var blob = new Blob([content], {
    type: `text/${format};charset=utf-8`,
  });
  saveAs(blob, `dataset.${format}`);
}
