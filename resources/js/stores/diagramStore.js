import { defineStore } from "pinia";

export const useDiagramStore = defineStore("diagram", {
  state: () => ({
    nodes: [
      {
      id: 'e0',
      type: 'entityType',
      position: { x: 250, y: 5 },
      data: { label: 'Product'},
      },
      {
        id: 'a0',
        type: 'attributeType',
        position: { x: 500, y: 5 },
        data: { label: 'id' },
      },
    ],
    edges: [],
  }),
  actions: {
    addNode(node) {
      this.nodes.push(node);
    },
    addEdge(edge) {
      this.edges.push(edge);
    },
    updateNode(updatedNode) {
      const index = this.nodes.findIndex((node) => node.id === updatedNode.id);
      if (index !== -1) {
        this.nodes[index] = updatedNode;
      }
    },
    updateEdge(updatedEdge) {
      const index = this.edges.findIndex((edge) => edge.id === updatedEdge.id);
      if (index !== -1) {
        this.edges[index] = updatedEdge;
      }
    },
    removeNode(nodeId) {
      this.nodes = this.nodes.filter((node) => node.id !== nodeId);
      this.edges = this.edges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId
      );
    },
    removeEdge(edgeId) {
      this.edges = this.edges.filter((edge) => edge.id !== edgeId);
    },
    resetDiagram() {
      this.nodes = [];
      this.edges = [];
    },
    resetToInitial() {
      this.nodes = [
        {
          id: 'e0',
          type: 'entityType',
          position: { x: 250, y: 5 },
          data: { label: 'Product'},
        },
        {
          id: 'a0',
          type: 'attributeType',
          position: { x: 500, y: 5 },
          data: { label: 'id' },
        },
      ];
      this.edges = [];
    },
  },
});
