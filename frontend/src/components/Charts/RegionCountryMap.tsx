// @ts-nocheck
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const RegionCountryMap = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    d3.select(svgRef.current).selectAll('*').remove();

    const margin = { top: 40, right: 120, bottom: 60, left: 120 };
    const width = 900 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Process data - group by region and country
    const nested = d3.rollup(
      data.filter(d => d.region && d.country),
      v => ({
        count: v.length,
        avgIntensity: d3.mean(v, d => d.intensity)
      }),
      d => d.region,
      d => d.country
    );

    // Flatten for heatmap
    const heatmapData = [];
    nested.forEach((countries, region) => {
      countries.forEach((value, country) => {
        heatmapData.push({ region, country, ...value });
      });
    });

    // Get top regions and countries
    const topRegions = [...new Set(heatmapData.map(d => d.region))]
      .slice(0, 8);
    const topCountries = [...new Set(heatmapData.map(d => d.country))]
      .slice(0, 12);

    const filteredData = heatmapData.filter(
      d => topRegions.includes(d.region) && topCountries.includes(d.country)
    );

    if (filteredData.length === 0) {
      svg.append('text')
        .attr('x', width / 2)
        .attr('y', height / 2)
        .attr('text-anchor', 'middle')
        .text('No region/country data available');
      return;
    }

    // Scales
    const x = d3.scaleBand()
      .range([0, width])
      .domain(topCountries)
      .padding(0.05);

    const y = d3.scaleBand()
      .range([height, 0])
      .domain(topRegions)
      .padding(0.05);

    const color = d3.scaleSequential(d3.interpolateInferno)
      .domain([0, d3.max(filteredData, d => d.avgIntensity)]);

    // Axes
    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end')
      .style('font-size', '10px');

    svg
      .append('g')
      .call(d3.axisLeft(y))
      .selectAll('text')
      .style('font-size', '11px');

    // Title
    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', -20)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .style('font-weight', 'bold')
      .text('Region-Country Intensity Heatmap');

    // Cells
    const cells = svg
      .selectAll('rect')
      .data(filteredData)
      .enter()
      .append('rect')
      .attr('x', d => x(d.country))
      .attr('y', d => y(d.region))
      .attr('width', x.bandwidth())
      .attr('height', y.bandwidth())
      .attr('fill', 'white')
      .style('cursor', 'pointer');

    // Animate cells
    cells
      .transition()
      .duration(1000)
      .delay((d, i) => i * 20)
      .attr('fill', d => color(d.avgIntensity));

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

    cells
      .on('mouseover', (event, d) => {
        d3.select(event.currentTarget).attr('stroke', '#000').attr('stroke-width', 2);
        tooltip.style('opacity', 1).html(`
          <strong>${d.region}</strong><br/>
          Country: ${d.country}<br/>
          Count: ${d.count}<br/>
          Avg Intensity: ${d.avgIntensity.toFixed(2)}
        `);
      })
      .on('mousemove', event => {
        tooltip
          .style('left', event.pageX + 15 + 'px')
          .style('top', event.pageY - 28 + 'px');
      })
      .on('mouseout', event => {
        d3.select(event.currentTarget).attr('stroke', 'none');
        tooltip.style('opacity', 0);
      });

    return () => {
      tooltip.remove();
    };
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default RegionCountryMap;
