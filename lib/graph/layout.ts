export interface Node {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  data: {
    name: string;
    [key: string]: unknown;
  };
}

export interface Edge {
  id: string;
  source: string;
  target: string;
  data: {
    relationship?: string;
    [key: string]: unknown;
  };
}

export class GraphLayout {
  private nodes: Node[];
  private edges: Edge[];

  constructor(nodes: Node[], edges: Edge[]) {
    this.nodes = nodes;
    this.edges = edges;
  }

  // Simple force-directed layout algorithm
  layout(iterations: number = 100): void {
    const repulsion = 1000;
    const attraction = 0.01;
    const damping = 0.9;

    for (let iter = 0; iter < iterations; iter++) {
      // Calculate repulsive forces
      for (let i = 0; i < this.nodes.length; i++) {
        for (let j = i + 1; j < this.nodes.length; j++) {
          const dx = this.nodes[j].x - this.nodes[i].x;
          const dy = this.nodes[j].y - this.nodes[i].y;
          const distance = Math.sqrt(dx * dx + dy * dy) || 1;

          const force = repulsion / (distance * distance);
          const fx = (dx / distance) * force;
          const fy = (dy / distance) * force;

          this.nodes[i].x -= fx;
          this.nodes[i].y -= fy;
          this.nodes[j].x += fx;
          this.nodes[j].y += fy;
        }
      }

      // Calculate attractive forces
      for (const edge of this.edges) {
        const source = this.nodes.find(n => n.id === edge.source);
        const target = this.nodes.find(n => n.id === edge.target);

        if (source && target) {
          const dx = target.x - source.x;
          const dy = target.y - source.y;
          const distance = Math.sqrt(dx * dx + dy * dy) || 1;

          const force = attraction * distance;
          const fx = (dx / distance) * force;
          const fy = (dy / distance) * force;

          source.x += fx * damping;
          source.y += fy * damping;
          target.x -= fx * damping;
          target.y -= fy * damping;
        }
      }
    }
  }

  getNodes(): Node[] {
    return this.nodes;
  }

  getEdges(): Edge[] {
    return this.edges;
  }
}