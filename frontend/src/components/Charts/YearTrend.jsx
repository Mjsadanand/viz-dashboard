import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const YearTrend = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    d3.select(svgRef.current).selectAll('*').remove();

    const margin = { top: 40, right: 30, bottom: 60, left: 60 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Process data - group by year
    const yearData = data
      .filter(d => d.end_year && parseInt(d.end_year) > 2000 && parseInt(d.end_year) < 2100)
      .map(d => ({
        year: parseInt(d.end_year),
        intensity: d.intensity,
        likelihood: d.likelihood,
        relevance: d.relevance
      }));

    const groupedByYear = d3.rollup(
      yearData,
      v => ({
        avgIntensity: d3.mean(v, d => d.intensity),
        avgLikelihood: d3.mean(v, d => d.likelihood),
        avgRelevance: d3.mean(v, d => d.relevance),
        count: v.length
      }),
      d => d.year
    );

    const chartData = Array.from(groupedByYear, ([year, values]) => ({
      year,
      ...values
    })).sort((a, b) => a.year - b.year);

    if (chartData.length === 0) {
      svg.append('text')
        .attr('x', width / 2)
        .attr('y', height / 2)
        .attr('text-anchor', 'middle')
        .text('No year data available');
      return;
    }

    // Scales
    const x = d3
      .scaleLinear()
      .domain(d3.extent(chartData, d => d.year))
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(chartData, d => Math.max(d.avgIntensity, d.avgLikelihood, d.avgRelevance))])
      .nice()
      .range([height, 0]);

    // Line generators
    const lineIntensity = d3
      .line()
      .x(d => x(d.year))
      .y(d => y(d.avgIntensity))
      .curve(d3.curveMonotoneX);

    const lineLikelihood = d3
      .line()
      .x(d => x(d.year))
      .y(d => y(d.avgLikelihood))
      .curve(d3.curveMonotoneX);

    const lineRelevance = d3
      .line()
      .x(d => x(d.year))
      .y(d => y(d.avgRelevance))
      .curve(d3.curveMonotoneX);

    // Axes
    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat(d3.format('d')));

    svg.append('g').call(d3.axisLeft(y));

    // Title
    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', -20)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .style('font-weight', 'bold')
      .text('Trends Over Years');

    // Add lines with animation
    const pathIntensity = svg
      .append('path')
      .datum(chartData)
      .attr('fill', 'none')
      .attr('stroke', '#e74c3c')
      .attr('stroke-width', 2.5)
      .attr('d', lineIntensity);

    const pathLikelihood = svg
      .append('path')
      .datum(chartData)
      .attr('fill', 'none')
      .attr('stroke', '#3498db')
      .attr('stroke-width', 2.5)
      .attr('d', lineLikelihood);

    const pathRelevance = svg
      .append('path')
      .datum(chartData)
      .attr('fill', 'none')
      .attr('stroke', '#2ecc71')
      .attr('stroke-width', 2.5)
      .attr('d', lineRelevance);

    // Animate lines
    const totalLength1 = pathIntensity.node().getTotalLength();
    const totalLength2 = pathLikelihood.node().getTotalLength();
    const totalLength3 = pathRelevance.node().getTotalLength();

    pathIntensity
      .attr('stroke-dasharray', totalLength1 + ' ' + totalLength1)
      .attr('stroke-dashoffset', totalLength1)
      .transition()
      .duration(2000)
      .attr('stroke-dashoffset', 0);

    pathLikelihood
      .attr('stroke-dasharray', totalLength2 + ' ' + totalLength2)
      .attr('stroke-dashoffset', totalLength2)
      .transition()
      .duration(2000)
      .delay(200)
      .attr('stroke-dashoffset', 0);

    pathRelevance
      .attr('stroke-dasharray', totalLength3 + ' ' + totalLength3)
      .attr('stroke-dashoffset', totalLength3)
      .transition()
      .duration(2000)
      .delay(400)
      .attr('stroke-dashoffset', 0);

    // Legend
    const legend = svg.append('g').attr('transform', `translate(${width - 150}, 20)`);

    const legendData = [
      { label: 'Intensity', color: '#e74c3c' },
      { label: 'Likelihood', color: '#3498db' },
      { label: 'Relevance', color: '#2ecc71' }
    ];

    legendData.forEach((item, i) => {
      legend
        .append('line')
        .attr('x1', 0)
        .attr('x2', 30)
        .attr('y1', i * 20)
        .attr('y2', i * 20)
        .attr('stroke', item.color)
        .attr('stroke-width', 2.5);

      legend
        .append('text')
        .attr('x', 35)
        .attr('y', i * 20 + 5)
        .style('font-size', '12px')
        .text(item.label);
    });
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default YearTrend;
