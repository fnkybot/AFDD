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
</script>

<template>
  <div style="padding: 10px; background-color: white; border: 1px solid #ccc; border-radius: 4px; text-align: center;">
    <Handle type="target" :position="Position.Top" />
    <input
      type="text"
      v-model="localLabel"
      @input="updateLabel(localLabel)"
      placeholder="Entity name..."
      style="outline: none; background-color: white; border: none; padding: 4px; border-radius: 4px; width: 100%; text-align: center;"
    />
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
