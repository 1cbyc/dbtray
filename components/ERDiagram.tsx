'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Node, Edge } from '../lib/graph/layout';

interface ERDiagramProps {
  nodes: Node[];
  edges: Edge[];
  width?: number;
  height?: number;
  onNodesChange?: (nodes: Node[]) => void;
  onEdgesChange?: (edges: Edge[]) => void;
}

export default function ERDiagram({
  nodes,
  edges,
  width = 800,
  height = 600,
  onNodesChange,
  onEdgesChange: _onEdgesChange
}: ERDiagramProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear previous render

    // Create arrow marker for relationships
    svg.append('defs').append('marker')
      .attr('id', 'arrowhead')
      .attr('viewBox', '-0 -5 10 10')
      .attr('refX', 13)
      .attr('refY', 0)
      .attr('orient', 'auto')
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('xoverflow', 'visible')
      .append('svg:path')
      .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
      .attr('fill', '#999');

    // Draw edges
    svg.selectAll('line')
      .data(edges)
      .enter()
      .append('line')
      .attr('x1', d => nodes.find(n => n.id === d.source)?.x || 0)
      .attr('y1', d => nodes.find(n => n.id === d.source)?.y || 0)
      .attr('x2', d => nodes.find(n => n.id === d.target)?.x || 0)
      .attr('y2', d => nodes.find(n => n.id === d.target)?.y || 0)
      .attr('stroke', '#999')
      .attr('stroke-width', 2)
      .attr('marker-end', 'url(#arrowhead)');

    // Draw nodes (tables)
    const nodeGroups = svg.selectAll('g')
      .data(nodes)
      .enter()
      .append('g')
      .attr('transform', d => `translate(${d.x - d.width / 2}, ${d.y - d.height / 2})`)
      .call(d3.drag<SVGGElement, Node>()
        .on('start', function(_event, _d) {
          // Drag started
        })
        .on('drag', function(event, d) {
          d.x = event.x;
          d.y = event.y;
          d3.select(this).attr('transform', `translate(${d.x - d.width / 2}, ${d.y - d.height / 2})`);
          // Update edges
          svg.selectAll<SVGLineElement, Edge>('line')
            .attr('x1', edge => nodes.find(n => n.id === edge.source)?.x || 0)
            .attr('y1', edge => nodes.find(n => n.id === edge.source)?.y || 0)
            .attr('x2', edge => nodes.find(n => n.id === edge.target)?.x || 0)
            .attr('y2', edge => nodes.find(n => n.id === edge.target)?.y || 0);
        })
        .on('end', function(_event, _d) {
          onNodesChange?.(nodes);
        })
      );

    // Table rectangles
    nodeGroups.append('rect')
      .attr('width', d => d.width)
      .attr('height', d => d.height)
      .attr('fill', '#fff')
      .attr('stroke', '#333')
      .attr('stroke-width', 2)
      .attr('rx', 5);

    // Table names
    nodeGroups.append('text')
      .attr('x', d => d.width / 2)
      .attr('y', 20)
      .attr('text-anchor', 'middle')
      .attr('font-weight', 'bold')
      .text(d => d.data.name);

  }, [nodes, edges, onNodesChange]);

  return (
    <div className="border rounded-lg p-4">
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className="border"
      />
    </div>
  );
}