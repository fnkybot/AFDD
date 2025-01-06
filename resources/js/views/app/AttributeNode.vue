<script setup>

import { Position, Handle, useVueFlow } from '@vue-flow/core';

const props = defineProps(['label', 'id']);

const instance = useVueFlow()
const node = instance.findNode(props.id)

const handleConnectable = (node, connectedEdges) => {
  // only allow connections if the node has less than 3 connections
  return connectedEdges.length < 1
}

// watch(() => props.label, (newLabel) => {
//   localLabel.value = newLabel;
// });

// function onSomeEvent(newLabel) {
//   const node = instance.findNode(props.id)
//   if (node) {
//     node.data = {
//       ...node.data,
//       label: newLabel,
//     };
//   } else {
//     console.error("Node not found!");
//   }
// }

// function updateLabel(value) {
//   localLabel.value = value;
//   onSomeEvent(value);
// }

const handlePositions = [
  Position.Top,
  Position.Bottom,
  Position.Left,
  Position.Right,
];

</script>

<template>
  <div
    :style="{
      width: '200px',
      height: '100px',
      padding: '10px',
      backgroundColor: node.data.bgColor ? node.data.bgColor : '#ffffff',
      border: '1px solid #ccc',
      borderRadius: '90%',
      textAlign: 'center'}">

    <Handle
      v-for="position in handlePositions"
      :id="`${position}-${id}`"
      :key="position"
      :position="position"
    />

    <div
      :style="{
        whiteSpace: 'normal',
        overflowWrap: 'break-word',
        wordBreak: 'break-word',
        height: '100%',
        outline: 'none',
        border: 'none',
        padding: '22px 10px',
        borderRadius: '90%',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: node.data.isPrimaryKey ? 'underline' : 'none'
      }">
      {{ node.data.label }}
    </div>
  </div>
</template>

