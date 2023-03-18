import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { Dimensions } from "../types";

function getDimensions() {
  let dims: Dimensions = {
    width: window.innerWidth * 0.67,
    height: window.innerHeight * 0.585,
    margin: {
      top: 5,
      left: 80,
      right: 30,
      bottom: 0,
    },
  };
  dims.containerWidth = dims.width - dims.margin.left - dims.margin.right;
  dims.containerHeight =
    dims.height - dims.margin.top - dims.margin.bottom - 55;

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
