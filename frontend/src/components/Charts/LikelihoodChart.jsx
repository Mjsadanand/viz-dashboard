import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const LikelihoodChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    d3.select(svgRef.current).selectAll('*').remove();

    const margin = { top: 40, right: 120, bottom: 60, left: 60 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Filter and prepare data
    const filteredData = data
      .filter(d => d.likelihood > 0 && d.relevance > 0 && d.intensity > 0)
      .slice(0, 100);

    // Scales
    const x = d3
      .scaleLinear()
      .domain([0, d3.max(filteredData, d => d.relevance) + 1])
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(filteredData, d => d.likelihood) + 1])
      .range([height, 0]);

    const size = d3
      .scaleSqrt()
      .domain([0, d3.max(filteredData, d => d.intensity)])
      .range([3, 20]);

    const color = d3
      .scaleOrdinal(d3.schemeCategory10)
      .domain([...new Set(filteredData.map(d => d.sector))]);

    // Axes
    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append('g').call(d3.axisLeft(y));

    // Axis labels
    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', height + 40)
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .text('Relevance');

    svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -height / 2)
      .attr('y', -40)
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .text('Likelihood');

    // Title
    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', -20)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .style('font-weight', 'bold')
      .text('Likelihood vs Relevance (Bubble size = Intensity)');

    // Bubbles
    const bubbles = svg
      .selectAll('circle')
      .data(filteredData)
      .enter()
      .append('circle')
      .attr('cx', d => x(d.relevance))
      .attr('cy', d => y(d.likelihood))
      .attr('r', 0)
      .attr('fill', d => color(d.sector))
      .attr('opacity', 0.6)
      .style('cursor', 'pointer');

    // Animate bubbles
    bubbles
      .transition()
      .duration(1000)
      .delay((d, i) => i * 10)
      .attr('r', d => size(d.intensity));

    // Tooltip
    const tooltip = d3
      .select('body')
      .append('div')
      .style('position', 'absolute')
      .style('background', 'rgba(0, 0, 0, 0.8)')
      .style('color', 'white')
      .style('padding', '10px')
      .style('border-radius', '4px')
      .style('pointer-events', 'none')
      .style('opacity', 0)
      .style('font-size', '12px')
      .style('z-index', '1000');

    bubbles
      .on('mouseover', (event, d) => {
        d3.select(event.currentTarget).attr('opacity', 1).attr('stroke', '#000').attr('stroke-width', 2);
        tooltip.style('opacity', 1).html(`
          <strong>${d.sector || 'N/A'}</strong><br/>
          Topic: ${d.topic || 'N/A'}<br/>
          Likelihood: ${d.likelihood}<br/>
          Relevance: ${d.relevance}<br/>
          Intensity: ${d.intensity}
        `);
      })
      .on('mousemove', event => {
        tooltip
          .style('left', event.pageX + 15 + 'px')
          .style('top', event.pageY - 28 + 'px');
      })
      .on('mouseout', event => {
        d3.select(event.currentTarget).attr('opacity', 0.6).attr('stroke', 'none');
        tooltip.style('opacity', 0);
      });

    // Legend
    const sectors = [...new Set(filteredData.map(d => d.sector))].filter(Boolean).slice(0, 6);
    const legend = svg
      .append('g')
      .attr('transform', `translate(${width + 10}, 0)`);

    sectors.forEach((sector, i) => {
      legend
        .append('circle')
        .attr('cx', 0)
        .attr('cy', i * 25)
        .attr('r', 6)
        .attr('fill', color(sector));

      legend
        .append('text')
        .attr('x', 15)
        .attr('y', i * 25 + 5)
        .style('font-size', '11px')
        .text(sector.length > 15 ? sector.substring(0, 15) + '...' : sector);
    });

    return () => {
      tooltip.remove();
    };
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default LikelihoodChart;
