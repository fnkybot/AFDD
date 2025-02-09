<script setup>
import { defineProps} from 'vue';
import { Position, Handle, useVueFlow } from '@vue-flow/core';

const props = defineProps(['label', 'id']);
const instance = useVueFlow()
const node = instance.findNode(props.id)

const handlePositions = [
  Position.Top,
  Position.Bottom,
  Position.Left,
  Position.Right,
];

</script>

<template>
  <Handle
      v-for="position in handlePositions"
      :id="`${position}-${id}`"
      :key="position"
      :position="position"
  />
  <div
  :style="{
    width: '200px',
    height: '100px',
    padding: '10px',
    backgroundColor: node.data.bgColor ? node.data.bgColor : '#ffffff',
    border: '1px solid #ccc',
    position: 'relative',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'}">

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
        justifyContent: 'center',
        textDecoration: node.data.isPrimaryKey ? 'underline' : 'none'
      }">
      {{ node.data.label }}
    </div>
  </div>
</template>
