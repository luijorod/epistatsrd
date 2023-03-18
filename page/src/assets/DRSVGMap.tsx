import { format } from "d3";

import { Dimensions, ScaleSequential } from "../types";
import { provincias } from "../utils";

interface DRSVGMapProps {
  dimensions: Dimensions;
  scale: ScaleSequential;
  setProvincias: any;
  values: Map<string, number>;
}

export function DRSVGMap({
  dimensions: dims,
  scale,
  setProvincias,
  values,
}: DRSVGMapProps) {
  return (
    <>
      <svg
        viewBox={`0 0 800 600`}
        height={dims.containerHeight}
        width={dims.containerWidth}
        id="dr-svg-map"
      >
        <g transform="translate(50,0)">
          {provincias.map((p) => (
            <path
              d={p.path}
              key={p.value}
              name={p.value}
              className="province"
              fill={values.get(p.value) ? scale(values.get(p.value)) : "gray"}
              stroke="black"
              strokeWidth={0.5}
              // onMouseEnter={() => console.log(`${p.value}: ${format(",")(values.get(p.value)) || "No seleccionada"}`)
              onMouseDown={() => {
                setProvincias((pr) => {
                  const provs = pr.map((a) => a.value);
                  if (provs.includes(p.value)) {
                    return pr.filter((a) => a.value !== p.value);
                  } else {
                    return [...pr, p];
                  }
                });
              }}
            />
          ))}
        </g>
        <defs>
          <linearGradient id="linearGradient" x1="0%" x2="0%" y1="100%" y2="0%">
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor="red" />
          </linearGradient>
        </defs>
        <g transform="translate(30,0)">
          <rect
            x="-15"
            y="35"
            height="80%"
            width="30"
            style={{ fill: "url('#linearGradient')" }}
          />
          <text x="0" y="5%" textAnchor="middle">
            {format(",")(scale.domain()[1]) !== "NaN"
              ? format(",")(scale.domain()[1])
              : "—"}
          </text>
          <text x="0" y="85%" textAnchor="middle">
            {format(",")(scale.domain()[0]) !== "NaN"
              ? format(",")(scale.domain()[0])
              : "—"}
          </text>
        </g>
      </svg>
    </>
  );
}
