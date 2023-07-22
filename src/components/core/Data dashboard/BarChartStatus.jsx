import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import {  useSelector } from 'react-redux';
import LineChart from './LineChartCompletion'
import BarChartPending from './BarChartPending'


const BarChart = () => {
  const [taskData, setTaskData] = useState([]);
  const {taskList} = useSelector((state)=>state.tasks)

  useEffect(() => {
    // Fetch task data from the API
    // const result = getTasks(token,dispatch)
    setTaskData(taskList)
  }, []);

  useEffect(() => {
    if (taskData.length > 0) {
      drawChart();
    }
  }, [taskData]);

  const drawChart = () => {
    const taskStates = [...new Set(taskData.map((task) => task.status))];

    const stateCounts = taskStates.map((state) =>
      taskData.filter((task) => task.status === state).length
    );

    const data = taskStates.map((state, index) => ({
      state,
      count: stateCounts[index],
    }));

    // Define chart dimensions and margins
    const width = 400;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create scales for X and Y axes
    const xScale = d3.scaleBand()
      .domain(taskStates)
      .range([0, innerWidth])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(stateCounts)])
      .range([innerHeight, 0]);

    // Create the chart container and position it with margins
    const svg = d3.select('#chartContainer');
    svg.selectAll('*').remove();

    const chartContainer = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Draw the bars
    chartContainer.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => xScale(d.state))
      .attr('y', (d) => yScale(d.count))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => innerHeight - yScale(d.count))
      .attr('fill', '#05BF8E');


      chartContainer.append('g')
      .attr('transform', `translate(0, ${innerHeight})`)
      .call(d3.axisBottom(xScale))
      .selectAll('path, line')
      .style('stroke', 'green')
      .style('stroke-width', 2) // Increase the stroke width of the X axis lines
      .style('color', '#fff') // Change the X axis numbering color to white
      .selectAll('.tick text')
      .style('fill', '#fff'); // Change the X axis tick label color to white
  
    chartContainer.append('g')
      .call(d3.axisLeft(yScale))
      .selectAll('path, line')
      .style('stroke', 'green')
      .style('stroke-width', 2) // Increase the stroke width of the Y axis lines
      .style('colour', '#fff') // Change the Y axis numbering color to white
      .selectAll('.tick text')
      .style('fill', '#fff');

  };

  return (
  <div>
      <div className='flex gap-8'>
      <h1 className='text-white font-bold'>Task States Bar Chart</h1>
      <svg id="chartContainer" width={400} height={300}></svg>
      <div>
        <BarChartPending></BarChartPending>
      </div>
    </div>
    <LineChart></LineChart>
    
  </div>
  );
};

export default BarChart;


