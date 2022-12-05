import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { Dimensions } from "../types";

function getDimensions() {
  let dims: Dimensions = {
    width: 960,
    height: 500,
    margin: {
      top: 20,
      left: 60,
      right: 30,
      bottom: 60,
    },
  };
  dims.containerWidth = dims.width - dims.margin.left - dims.margin.right;
  dims.containerHeight = dims.height - dims.margin.top - dims.margin.bottom;

  return dims;
}

export function useDimensions(
  initDims: Dimensions = null
): [Dimensions, Dispatch<SetStateAction<Dimensions>>] {
  initDims = initDims || getDimensions();
  const [dimensions, setDimensions] = useState(initDims);

  useEffect(() => {
    function handleResize() {
      setDimensions({ ...getDimensions() });
    }
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setDimensions]);

  return [dimensions, setDimensions];
}
