import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const RelevanceChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    d3.select(svgRef.current).selectAll('*').remove();

    const margin = { top: 40, right: 30, bottom: 80, left: 60 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Group by region
    const groupedData = d3.rollup(
      data,
      v => d3.mean(v, d => d.relevance),
      d => d.region
    );

    const chartData = Array.from(groupedData, ([region, relevance]) => ({
      region,
      relevance
    }))
      .filter(d => d.region && d.relevance > 0)
      .sort((a, b) => b.relevance - a.relevance);

    // Scales
    const x = d3
      .scaleBand()
      .range([0, width])
      .domain(chartData.map(d => d.region))
      .padding(0.3);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(chartData, d => d.relevance)])
      .nice()
      .range([height, 0]);

    // Color scale
    const color = d3.scaleSequential(d3.interpolatePlasma)
      .domain([0, chartData.length]);

    // Axes
    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end')
      .style('font-size', '10px');

    svg.append('g').call(d3.axisLeft(y));

    // Title
    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', -20)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .style('font-weight', 'bold')
      .text('Average Relevance by Region');

    // Bars
    const bars = svg
      .selectAll('.bar')
      .data(chartData)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.region))
      .attr('width', x.bandwidth())
      .attr('y', height)
      .attr('height', 0)
      .attr('fill', (d, i) => color(i))
      .style('cursor', 'pointer');

    // Animate
    bars
      .transition()
      .duration(800)
      .delay((d, i) => i * 50)
      .attr('y', d => y(d.relevance))
      .attr('height', d => height - y(d.relevance));

    // Tooltip
    const tooltip = d3
      .select('body')
      .append('div')
      .style('position', 'absolute')
      .style('background', 'rgba(0, 0, 0, 0.8)')
      .style('color', 'white')
      .style('padding', '8px')
      .style('border-radius', '4px')
      .style('pointer-events', 'none')
      .style('opacity', 0)
      .style('font-size', '12px')
      .style('z-index', '1000');

    bars
      .on('mouseover', (event, d) => {
        d3.select(event.currentTarget).attr('opacity', 0.7);
        tooltip
          .style('opacity', 1)
          .html(`<strong>${d.region}</strong><br/>Relevance: ${d.relevance.toFixed(2)}`);
      })
      .on('mousemove', event => {
        tooltip
          .style('left', event.pageX + 15 + 'px')
          .style('top', event.pageY - 28 + 'px');
      })
      .on('mouseout', event => {
        d3.select(event.currentTarget).attr('opacity', 1);
        tooltip.style('opacity', 0);
      });

    return () => {
      tooltip.remove();
    };
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default RelevanceChart;
