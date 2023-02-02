import { useMemo } from "react";

export function useFilter(brushExtent, dataset, dateAccessor, provincias): any {
  const [filteredDataset, filteredDatasets] = useMemo(() => {
    const filteredDataset = brushExtent
      ? dataset.filter((d) => {
          const date = dateAccessor(d);
          return (
            provincias.includes(d.provincia) &&
            date >= brushExtent[0] &&
            date <= brushExtent[1]
          );
        })
      : dataset.filter((d) => provincias.includes(d.provincia));

    const filteredDatasets = provincias.map((provincia) =>
      filteredDataset.filter((d) => d.provincia === provincia)
    );

    return [filteredDataset, filteredDatasets];
  }, [brushExtent, dataset, provincias]);

  return [filteredDataset, filteredDatasets];
}
