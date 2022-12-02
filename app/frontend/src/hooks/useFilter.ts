import { useEffect } from "react";
import { extent } from "d3";

export function useFilter(
  brushExtent,
  dataset,
  provincias,
  setScalesExtent,
  setData,
  setDatasets,
  xAccessor,
  yAccessor
): any {
  let filteredDatasets;
  const provStrings = provincias.map((d) => d.value);

  useEffect(() => {
    let filteredDataset = !brushExtent
      ? dataset.filter((d) => provStrings.includes(d.provincia))
      : dataset.filter((d) => {
          const date = xAccessor(d);
          return (
            provStrings.includes(d.provincia) &&
            date >= brushExtent[0] &&
            date <= brushExtent[1]
          );
        });

    filteredDatasets = provStrings.map((provincia) =>
      filteredDataset.filter((d) => d.provincia === provincia)
    );

    setScalesExtent({
      x: extent(filteredDataset, xAccessor),
      y: extent(filteredDataset, yAccessor),
    });
    setData(filteredDataset);
    setDatasets(filteredDatasets);
  }, [brushExtent, provincias]);

  return filteredDatasets;
}
