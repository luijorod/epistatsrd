import * as d3 from "d3";

import { Dimensions } from "../types";
import csv from "./covid_data.csv";

export async function draw() {
  // 1. Data
  const dataset = csv
    .slice(2000, 4000)
    .filter((x) => x.provincia === "Santiago");
  console.log(dataset);

  const parseDate = d3.timeParse("%d/%m/%Y");
  const xAccessor = (d) => parseDate(d.fecha);

  const yAccessor = (d) => d.casos_nuevos;

  // 2. Dimensions
  let dims: Dimensions = {
    width: document.body.clientWidth,
    height: 400,
    margins: {
      top: 20,
      right: 20,
      bottom: 35,
      left: 20,
    },
  };
  dims.containerWidth = dims.width - dims.margins.left - dims.margins.right;
  dims.containerHeight = dims.height - dims.margins.top - dims.margins.bottom;

  // 3. Container
  const svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", dims.width)
    .attr("height", dims.height);

  const container = svg
    .append("g")
    .style(
      "transform",
      `translate(${dims.margins.left}px, ${dims.margins.top}px)`
    );

  const tooltip = d3.select("#tooltip");
  const tooltipDot = container
    .append("circle")
    .attr("r", 5)
    .attr("fill", "red")
    .attr("stroke", "black")
    .attr("stroke-width", 2)
    .style("opacity", 0)
    .style("pointer-events", "none");

  // 4. Scales
  const xScale = d3
    .scaleTime()
    .domain(d3.extent(dataset, xAccessor))
    .range([0, dims.containerWidth]);

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(dataset, yAccessor))
    .range([dims.containerHeight, 0])
    .nice();

  // 5. Draw
  const lineGenerator = d3
    .line()
    .x((d) => xScale(xAccessor(d)))
    .y((d) => yScale(yAccessor(d)));

  container
    .append("path")
    .datum(dataset)
    .attr("d", lineGenerator)
    .attr("fill", "none")
    .attr("stroke", "blue")
    .attr("stroke-width", 2);

  // 6. Axes
  const xAxisGenerator = d3.axisBottom(xScale);
  const xAxisGroup = container
    .append("g")
    .style("transform", `translateY(${dims.containerHeight}px)`)
    .call(xAxisGenerator);
  xAxisGroup
    .append("text")
    .attr("x", dims.containerWidth / 2)
    .attr("y", dims.margins.bottom)
    .attr("fill", "black")
    .style("font-size", 15)
    .text("Fecha");

  const yAxisGenerator = d3.axisLeft(yScale);
  const yAxisGroup = container.append("g").call(yAxisGenerator);
  yAxisGroup
    .append("text")
    .attr("x", dims.containerHeight / 2)
    .attr("y", dims.margins.left / 2)
    .attr("fill", "black");
  //.style("transform", "rotate(270deg)");
  //.style("text-anchor", "middle")
  //.style("shape-rendering", "geometricPrecision");

  // Tooltip
  container
    .append("rect")
    .attr("width", dims.containerWidth)
    .attr("height", dims.containerHeight)
    .style("opacity", 0)
    .on("mousemove", function (event) {
      const mousePos = d3.pointer(event, this);
      const date = xScale.invert(mousePos[0]);

      const bisector = d3.bisector(xAccessor).left;
      const index = bisector(dataset, date);
      const value = dataset[index - 1];

      tooltipDot
        .style("opacity", 1)
        .attr("cx", xScale(xAccessor(value)))
        .attr("cy", yScale(yAccessor(value)))
        .raise();

      tooltip
        .style("display", "block")
        .style("top", yScale(yAccessor(value)) - 60 + "px")
        .style("left", xScale(xAccessor(value)) + "px");

      const dateFormatter = d3.timeFormat("%B %-d, %Y");
      tooltip.select(".date").text(`Fecha: ${dateFormatter(xAccessor(value))}`);
      tooltip.select(".value").text(`Casos nuevos: ${yAccessor(value)}`);
    })
    .on("mouseleave", function (event) {
      tooltipDot.style("opacity", 0);
      tooltip.style("display", "none");
    });
}
