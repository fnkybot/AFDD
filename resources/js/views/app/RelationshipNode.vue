<script setup>
import { defineProps, defineEmits, watch, ref } from 'vue';
import { Position, Handle, useVueFlow } from '@vue-flow/core';

const props = defineProps(['label', 'id']);
const instance = useVueFlow()
const localLabel = ref(props.label);

watch(() => props.label, (newLabel) => {
  localLabel.value = newLabel;
});

function onSomeEvent(newLabel) {
  const node = instance.findNode(props.id)
  if (node) {
    node.data = {
      ...node.data,
      label: newLabel,
    };
  } else {
    console.error("Node not found!");
  }
}

function updateLabel(value) {
  localLabel.value = value;
  onSomeEvent(value);
}

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
      :id="`${position}-handle`"
      :key="position"
      :position="position"
    />
  <div
    style="width: 200px; height: 100px; background-color: white; border: 1px solid #fff; position: relative; display: flex; align-items: center; justify-content: center; clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);">
    <input
      type="text"
      v-model="localLabel"
      @input="updateLabel(localLabel)"
      placeholder="Relationship name..."
      style="outline: none; background-color: white; border: none; padding: 4px; text-align: center; width: 80%; transform: rotate(0deg);"
    />
  </div>
</template>
