<script setup>

import { Position, Handle, useVueFlow, useNode } from '@vue-flow/core';

const props = defineProps(['id']);

//const { id, label, data } = useNode(props.id);

const instance = useVueFlow();
const node = instance.findNode(props.id);

</script>

<template>
  <Handle type="target" :position="Position.Top" />
  <Handle type="source" :position="Position.Bottom" />
  <div
    :style="{
      width: '300px',
      padding: '10px',
      backgroundColor: node.data.bgColor || '#211f12',
      border: '1px solid #ccc',
      borderRadius: '4px',
      textAlign: 'left',
    }"
  >

    <div
      :style="{
        fontWeight: 'bold',
        color: '#746f05',
        textAlign: 'center',
        marginBottom: '10px',
      }"
    >
      {{ node.data.label }}
    </div>

    <table :style="{ width: '100%', color: '#746f05', borderCollapse: 'collapse' }">
      <thead>
        <tr>
          <th :style="{ borderBottom: '1px solid #ccc', textAlign: 'left' }">Field</th>
          <th :style="{ borderBottom: '1px solid #ccc', textAlign: 'left' }">Type</th>
          <th :style="{ borderBottom: '1px solid #ccc', textAlign: 'left' }">Key</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="field in node.data.fields" :key="field.name">
          <td>{{ field.name }}</td>
          <td>{{ field.type }}</td>
          <td>{{ field.keyType }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
