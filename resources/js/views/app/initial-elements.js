import { MarkerType } from '@vue-flow/core'

export const initialEdges = [
  {
    id: '10-11',
    source: '10',
    target: '11',
    animated: true,
    updatable: true,
  },

]

export const initialNodes = [
  // {
  //   id: 'e1-2',
  //   source: '1',
  //   target: '2',
  //   animated: true,
  // },
  // {
  //   id: 'e1-3',
  //   source: '1',
  //   target: '3',
  //   label: 'edge with arrowhead',
  //   markerEnd: MarkerType.ArrowClosed,
  // },
  // {
  //   id: 'e4-5',
  //   type: 'step',
  //   source: '4',
  //   target: '5',
  //   label: 'Node 2',
  //   style: { stroke: 'orange' },
  //   labelBgStyle: { fill: 'orange' },
  // },
  // {
  //   id: 'e3-4',
  //   type: 'smoothstep',
  //   source: '3',
  //   target: '4',
  //   label: 'smoothstep-edge',
  // },
  {
    id: 'e0',
    type: 'entityType',
    position: { x: 250, y: 5 },
    data: { label: ''},
  },
  {
    id: 'a0',
    type: 'attributeType',
    position: { x: 500, y: 5 },
    data: { label: '' },
  },
  {
    id: 'r0',
    type: 'relationshipType',
    position: { x: 750, y: 5 },
    data: { label: '' },
  },
]
