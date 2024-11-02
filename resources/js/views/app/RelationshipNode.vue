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
  <div
    style="width: 180px; height: 100px; background-color: white; border: 1px solid #fff; position: relative; display: flex; align-items: center; justify-content: center; clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);">

    <!-- Hak na lewym wierzchołku rombu -->
    <Handle type="target" :position="Position.Left"
           style="position: absolute; left: 2px; top: 50%; transform: translateY(-50%); z-index: 1000;" />

    <input
      type="text"
      v-model="localLabel"
      @input="updateLabel(localLabel)"
      placeholder="Relationship name..."
      style="outline: none; background-color: white; border: none; padding: 4px; text-align: center; width: 100%; transform: rotate(0deg);"
    />

    <!-- Hak na prawym wierzchołku rombu -->
    <Handle type="source" :position="Position.Right"
           style="position: absolute; right: 2px; top: 50%; transform: translateY(-50%); z-index: 1000;" />
  </div>
</template>
