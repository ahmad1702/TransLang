// import React, { useState, useEffect, useRef } from "react";
// import * as d3 from "d3";
// import "d3";
// import "./DlineChart.scss";

// export default function DlineChart() {
//   const [data] = useState([25, 50, 35, 15, 94, 10]);
//   const svgRef = useRef();

//   useEffect(() => {
//     // setting up svg
//     const w = 400;
//     const h = 100;
//     const svg = d3
//       .select(svgRef.current)
//       .attr("width", w)
//       .attr("height", h)
//       .style("overflow", "visible");
//     // setting the scaling
//     const xScale = d3
//       .scaleLinear()
//       .domain([0, data.length - 1])
//       .range([0, w]);
//     const yScale = d3.scaleLinear().domain([0, h]).range([h, 0]);
//     const generateScaledLine = d3
//       .line()
//       .x((d, i) => xScale(i))
//       .y(yScale)
//       .curve(d3.curveCardinal);
//     // setting the axes
//     const xAxis = d3
//       .axisBottom(xScale)
//       .ticks(data.length)
//       .tickFormat((i) => i + 1);
//     const yAxis = d3.axisBottom(yScale).ticks(5);
//     svg.append("g").call(xAxis).attr("transform", `translate(0, ${h})`);
//     svg.append("g").call(xAxis).attr("transform", `translate(0, ${h})`);

//     // setting up the data for the svg
//     svg
//       .selectAll(".line")
//       .data([data])
//       .join("path")
//       .attr("d", (d) => generateScaledLine(d))
//       .attr("fill", "none")
//       .attr("stroke", "black");
//   }, [data]);
//   return (
//     <div className="DlineChart">
//       <div className="dlinecontainer">
//         <h1>This is your space, this is your area</h1>
//         <svg ref={svgRef}></svg>
//       </div>
//     </div>
//   );
// }
