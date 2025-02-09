<script setup>
import { ref } from 'vue';
import { useVueFlow, Panel } from '@vue-flow/core';

const { onNodeClick, onEdgeClick, setNodes } = useVueFlow();

const label = ref('');
const bgColor = ref('#ffffff');
const isPrimaryKey = ref(false);
const nodeType = ref('VARCHAR(255)');

const handleUpdate = () => {
  if (selectedNode.value) {
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === selectedNode.value.id
          ? {
              ...node,
              data: {
                ...node.data,
                label: label.value,
                isPrimaryKey: isPrimaryKey.value,
                bgColor: bgColor.value,
                nodeType: nodeType.value,
              },
            }
          : node
      )
    );
  }
};

const selectedNode = ref(null);

onNodeClick(({ node }) => {
  if (node) {
    selectedNode.value = node;
    label.value = node.data?.label || '';
    isPrimaryKey.value = node.data?.isPrimaryKey || false;
    bgColor.value = node.data?.bgColor || '#ffffff';
    nodeType.value = node.data?.nodeType || 'VARCHAR(255)';
  }
});

onEdgeClick(({ edge }) => {
  if (edge && selectedNode.value) {
    selectedNode.value = null;
  }
});
</script>

<template>
  <Panel v-if="selectedNode" position="bottom-left">
    <div class="field">
      <label for="label">Label:</label>
      <input id="label" v-model="label" @input="handleUpdate" />
    </div>

    <div class="field">
      <label for="bgColor">Color:</label>
      <input id="bgColor" v-model="bgColor" type="color" @input="handleUpdate" />
    </div>

    <div class="field" v-if="selectedNode?.id.startsWith('a')">
      <label for="isPrimaryKey"><u>Primary Key</u>:</label>
      <input class="form-check-input"  id="isPrimaryKey" type="checkbox" v-model="isPrimaryKey" @change="handleUpdate" />
    </div>

    <div class="field" v-if="selectedNode?.type === 'attributeType'">
      <label>Type:</label>
      <div>
        <label>
          <input
            class="form-check-input"
            type="radio"
            value="INT"
            v-model="nodeType"
            @change="handleUpdate"
          />
          Number
        </label>
        <label>
          <input
            class="form-check-input"
            type="radio"
            value="VARCHAR(255)"
            v-model="nodeType"
            @change="handleUpdate"
          />
          Text
        </label>
        <label>
          <input
            class="form-check-input"
            type="radio"
            value="DATE"
            v-model="nodeType"
            @change="handleUpdate"
          />
          Date
        </label>
        <label>
          <input
            class="form-check-input"
            type="radio"
            value="BOOLEAN"
            v-model="nodeType"
            @change="handleUpdate"
          />
          Boolean
        </label>
      </div>
    </div>
  </Panel>
</template>

<style scoped>
.vue-flow__panel {
  background-color: #303e44;
  color: white;
  border-radius: 8px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.vue-flow__panel .field {
  display: flex;
  gap: 8px;
  flex-direction: row;
  align-items: center;
}

.vue-flow__panel label {
  display: block;
}

.vue-flow__panel input {
  padding: 2px;
  border-radius: 5px;
}
</style>
