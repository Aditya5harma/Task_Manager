import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import { useSelector } from 'react-redux';

const LineChart = () => {
  const [taskData, setTaskData] = useState([]);

  const {taskList} = useSelector((state)=>state.tasks)


useEffect(() => {
 
        setTaskData(taskList);
  }, []);

  useEffect(() => {
    if (taskData.length > 0) {
      drawChart();
    }
  }, [taskData]);

  const drawChart = () => {
    // Process the data and prepare the chart
    const filteredTasks = taskData.filter((task) =>
      (task.status === 'Complete' &&
      (task.prevStatus === 'Pending' || task.prevStatus === 'Ongoing'))
    );

    const dateFormat = d3.timeParse('%Y-%m-%d');
    const dailyTaskCount = d3.rollup(
      filteredTasks,
      (v) => v.length,
      (d) => dateFormat(d.date)
    );

    const data = Array.from(dailyTaskCount, ([date, count]) => ({ date, count }));

    // Define chart dimensions and margins
    const width = 400;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create scales for X and Y axes
    const xScale = d3.scaleTime()
      .domain(d3.extent(data, (d) => d.date))
      .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, (d) => d.count)])
      .range([innerHeight, 0]);

    // Create the chart container and position it with margins
    const svg = d3.select('#chartContainer');
    svg.selectAll('*').remove();

    const chartContainer = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Draw the line
    const line = d3.line()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.count));

    chartContainer.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2)
      .attr('d', line);

    // Add X and Y axes
    chartContainer.append('g')
      .attr('transform', `translate(0, ${innerHeight})`)
      .call(d3.axisBottom(xScale));

    chartContainer.append('g')
      .call(d3.axisLeft(yScale));

  };

  return (
    <div>
      <h2>Task State Changes Line Chart</h2>
      <svg id="chartContainer" width={400} height={300}></svg>
    </div>
  );
};

export default LineChart;
