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

  <div style="padding: 10px; background-color: white; border: 1px solid #ccc; border-radius: 90%; text-align: center;">
    <Handle
      v-for="position in handlePositions"
      :id="`${position}-handle`"
      :key="position"
      :position="position"
    />

    <input
      type="text"
      v-model="localLabel"
      @input="updateLabel(localLabel)"
      placeholder="Attribute name..."
      style="outline: none; background-color: white; border: none; padding: 24px 16px; border-radius: 90%; width: 100%; text-align: center;"
    />

  </div>
</template>
