import {
  ScaleLinear as D3ScaleLinear,
  ScaleSequential as D3ScaleSequential,
  ScaleTime as D3ScaleTime,
} from "d3";

export type Dimensions = {
  width: number;
  height: number;
  margin?: Margin;
  containerWidth?: number;
  containerHeight?: number;
};

export type Margin = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

export type ScaleLinear = D3ScaleLinear<number, number>;
export type ScaleSequential = D3ScaleSequential<string, string>;
export type ScaleTime = D3ScaleTime<number, number>;
