<script setup>
import { ref } from 'vue'
import { useVueFlow, Panel } from '@vue-flow/core'

const { onEdgeClick, onNodeClick, setEdges, nodes } = useVueFlow()

const selectedOption = ref('1')
const selectedEdge = ref(null)

const handleUpdate = () => {
  if (selectedEdge.value) {
    setEdges((edges) =>
      edges.map((edge) =>
        edge.id === selectedEdge.value.id
          ? {
              ...edge,
              label: selectedOption.value,
            }
          : edge
      )
    )
  }
}

onNodeClick(({ node }) => {
  if (node && selectedEdge.value) selectedEdge.value = null
})

onEdgeClick(({ edge }) => {
  if (edge) {
    const sourceNodeId = edge.source
    const targetNodeId = edge.target

    const allNodes = nodes.value

    const sourceNode = allNodes.find((node) => node.id === sourceNodeId)
    const targetNode = allNodes.find((node) => node.id === targetNodeId)

    if (
      (sourceNode?.type === 'entityType' && targetNode?.type === 'relationshipType') ||
      (sourceNode?.type === 'relationshipType' && targetNode?.type === 'entityType')
    ) {
      selectedEdge.value = edge
      selectedOption.value = edge.label || '1'
    } else {
      selectedEdge.value = null
    }
  }
})

</script>

<template>
  <Panel v-if="selectedEdge" position="bottom-left">
    <div class="field">
      <label>Relation:</label>
      <div class="options">
        <label>
          <input
            class="form-check-input"
            type="radio"
            v-model="selectedOption"
            value="1"
            @change="handleUpdate"
          />
          1
        </label>
        <label>
          <input
            class="form-check-input"
            type="radio"
            v-model="selectedOption"
            value="N"
            @change="handleUpdate"
          />
          N
        </label>
        <label>
          <input
            class="form-check-input"
            type="radio"
            v-model="selectedOption"
            value="M"
            @change="handleUpdate"
          />
          M
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

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.options {
  display: flex;
  gap: 16px;
}

.options label {
  display: flex;
  align-items: center;
}

.options input[type='radio'] {
  margin-right: 4px;
}
</style>
