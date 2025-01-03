<script setup>
import { ref } from 'vue'
import { useVueFlow, Panel } from '@vue-flow/core'

const { onEdgeClick, onNodeClick, setEdges, nodes } = useVueFlow()

// Zmienna do przechowywania wybranej opcji dla krawędzi
const selectedOption = ref('1')

// Zmienna do przechowywania aktualnie wybranej krawędzi
const selectedEdge = ref(null)

// Funkcja do aktualizacji krawędzi
const handleUpdate = () => {
  if (selectedEdge.value) {
    setEdges((edges) =>
      edges.map((edge) =>
        edge.id === selectedEdge.value.id
          ? {
              ...edge,
              label: selectedOption.value, // Aktualizacja etykiety bezpośrednio na krawędzi
            }
          : edge
      )
    )
  }
}

// Nasłuchiwanie kliknięć na nodach i odznaczanie krawędzi w razie potrzeby
onNodeClick(({ node }) => {
  if (node && selectedEdge.value) selectedEdge.value = null
})

// Nasłuchiwanie kliknięć na krawędziach
onEdgeClick(({ edge }) => {
  if (edge) {
    // Pobierz identyfikatory nodów źródłowego i docelowego
    const sourceNodeId = edge.source
    const targetNodeId = edge.target

    // Pobierz listę nodów z Vue Flow
    const allNodes = nodes.value
    console.log(allNodes)
    // Znajdź nody źródłowy i docelowy
    const sourceNode = allNodes.find((node) => node.id === sourceNodeId)
    const targetNode = allNodes.find((node) => node.id === targetNodeId)

    // Sprawdź, czy nody mają określone typy
    if (
      (sourceNode?.type === 'entityType' && targetNode?.type === 'relationshipType') ||
      (sourceNode?.type === 'relationshipType' && targetNode?.type === 'entityType')
    ) {
      // Jeśli warunek spełniony, pokaż panel edycji
      selectedEdge.value = edge
      selectedOption.value = edge.label || '1' // Inicjalizacja selectedOption z edge.label
    } else {
      // Jeśli warunek nie jest spełniony, ukryj panel edycji
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
  background-color: #2d3748;
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
