import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import { useSelector } from 'react-redux';

const BarChartPending = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const userlist = useSelector((state)=>state.profile)
  console.log("userlist",userlist)

  useEffect(() => {
        setEmployeeData(userlist);
  }, []);

  useEffect(() => {
    if (employeeData.length > 0) {
      drawChart();
    }
  }, [employeeData]);

  const drawChart = () => {
    const sortedData = employeeData.sort(
      (a, b) => a.tasksAssigned.filter((task) => task.status === 'Pending').length -
               b.tasksAssigned.filter((task) => task.status === 'Pending').length
    );
        console.log("sortedData",sortedData)
    // Select the top 5 employees with the least number of pending tasks
    const top5Employees = sortedData.slice(0, 5);

    // Create an array with employee names and pending task counts
    const data = top5Employees.map((employee) => ({
      name: `${employee.firstName} ${employee.lastName}`,
      pendingTasks: employee.tasksAssigned.filter((task) => task.status === 'Pending').length,
    }));

    console.log("data",data)

    // Define chart dimensions and margins
    const width = 400;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create scales for X and Y axes
    const xScale = d3.scaleBand()
      .domain(data.map((d) => d.name))
      .range([0, innerWidth])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, (d) => d.pendingTasks)])
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
      .attr('x', (d) => xScale(d.name))
      .attr('y', (d) => yScale(d.pendingTasks))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => innerHeight - yScale(d.pendingTasks))
      .attr('fill', 'steelblue');

    // Add X and Y axes
    chartContainer.append('g')
      .attr('transform', `translate(0, ${innerHeight})`)
      .call(d3.axisBottom(xScale))
      .selectAll('.tick text')
      .style('fill', 'white'); // Set the X axis tick label color to white

    chartContainer.append('g')
      .call(d3.axisLeft(yScale))
      .selectAll('.tick text')
      .style('fill', 'white'); // Set the Y axis tick label color to white
  };

  return (
    <div>
      <h2>Top 5 Employees with Least Pending Tasks</h2>
      <svg id="chartContainer" width={400} height={300}></svg>
    </div>
  );
};

export default BarChartPending;
