<script setup>
import { ref, computed, onBeforeUnmount } from 'vue'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { ControlButton, Controls, } from '@vue-flow/controls'
import EditBox from './EditBox.vue'
import { MiniMap } from '@vue-flow/minimap'
// import { initialPDMNodes } from './initial-elements.js'
import initialPDMNodes from './initial-elements.json'

import Icon from './Icon.vue'

/**
 * `useVueFlow` provides:
 * 1. a set of methods to interact with the VueFlow instance (like `fitView`, `setViewport`, `addEdges`, etc)
 * 2. a set of event-hooks to listen to VueFlow events (like `onInit`, `onNodeDragStop`, `onConnect`, etc)
 * 3. the internal state of the VueFlow instance (like `nodes`, `edges`, `viewport`, etc)
 */
const { onInit, onNodeDragStop, onConnect, addEdges, updateEdge, setNodes, setViewport, toObject } = useVueFlow()

const loading = ref(false);
const nodes = ref([]);
const edges = ref([]);
const tables = ref(null);

const updateGraph = (newNodes, newEdges) => {
  nodes.value = newNodes || nodes.value;
  edges.value = newEdges || edges.value;
};


const errorMessage = ref("");

const fetchPDMTables = async (nodes, edges) => {
  try {
    // Wysyłanie żądania POST do backendu
    const response = await axios.post("/api/generate-pdm", {
      projectData: {
        nodes: nodes, // Przekazanie aktualnej wartości
        edges: edges,
      },
    });

    // Sprawdź odpowiedź
    if (response.status === 200 && response.data) {
      tables.value = response.data;
      console.log("Fetched PDM tables:", response.data);
    } else {
      console.error("Invalid response:", response);
      throw new Error("Failed to fetch PDM tables.");
    }
  } catch (error) {
    // Obsługa błędów
    errorMessage.value =
      error.response?.data?.error || "Error fetching PDM tables.";
    console.error("Error fetching PDM tables:", error);
  }
};

// // Pobierz dane PDM z API
// const fetchPDMTables = async () => {
//   try {
//     const response = await fetch("/api/export-pdm");
//     if (!response.ok) {
//       throw new Error("Failed to fetch PDM tables.");
//     }
//     const data = await response.json();
//     tables.value = data;
//   } catch (error) {
//     errorMessage.value = error.message;
//     console.error("Error fetching PDM tables:", error);
//   }
// };

const saveJSONToFile = () => {
  if (!tables.value) {
    alert("No data available to save.");
    return;
  }

  const dataStr = JSON.stringify(tables.value, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  // Utwórz tymczasowy element <a>, aby pobrać plik
  const a = document.createElement("a");
  a.href = url;
  a.download = "pdm_tables.json";
  a.click();

  // Zwolnij pamięć zajmowaną przez URL
  URL.revokeObjectURL(url);
};

// Funkcja do obsługi importu pliku
async function handleFileUpload(event) {
  const file = event.target.files[0];

  if (!file) {
    alert("Nie wybrano pliku");
    return;
  }

  const formData = new FormData();
  formData.append("erdFile", file);

  // Zmienna loading (jeśli jeszcze nie istnieje)
  loading.value = true;

  try {
    const response = await axios.post("/api/upload-erd", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 200 && response.data) {
      console.log("Plik przesłany pomyślnie:", response.data);
      updateVueFlow(response.data.vueFlowData); // Funkcja aktualizująca Vue Flow
      tables.value = response.data.pdmData;
    } else {
      console.error("Nieprawidłowa odpowiedź serwera:", response);
      alert("Nie udało się przetworzyć pliku. Spróbuj ponownie.");
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.error || "Błąd podczas przesyłania pliku.";
    console.error("Błąd przesyłania pliku:", error);
    alert(errorMessage);
  } finally {
    loading.value = false;
  }
}


// Aktualizacja VueFlow
function updateVueFlow(pdmData) {
  nodes.value = pdmData.nodes;
  edges.value = pdmData.edges || [];
  setNodes(pdmData.nodes);
}

// our dark mode toggle flag
const dark = ref(false)

import PDMNode from './PDMNode.vue';

import SaveRestoreControls from './Controls.vue'


onInit((vueFlowInstance) => {
  // instance is the same as the return of `useVueFlow`
  vueFlowInstance.fitView()

})


onNodeDragStop(({ event, nodes, node }) => {
  console.log('Node Drag Stop', { event, nodes, node })
})


/**
 * Resets the current viewport transformation (zoom & pan)
 */
function resetTransform() {
  setViewport({ x: 0, y: 0, zoom: 1 })
}

function toggleDarkMode() {
  dark.value = !dark.value
}


function isActive(path) {
  return window.location.pathname === path;}

</script>

<template>
  <Head title="Transform to PDM" />

  <BasePageHeading
    title="Transform to PDM"
    :subtitle="`Welcome ${$page.props.auth.user.name.split(' ')[0]}, here you can transform your logical model to physical model!`"
  >
    <template #extra>

      <ul class="nav nav-pills ">
        <li class="nav-item me-1">
          <a class="nav-link" :class="{ active: isActive('/app') }" href="/app" >
            <i class="fa fa-fw fa-home me-1"></i> Draw ERD Graph
          </a>
        </li>

        <li class="nav-item me-1">
          <a class="nav-link" :class="{ active: isActive('/pdm') }" href="/pdm" >
            <i class="fa fa-fw fa-pencil-alt me-1"></i> Transform to Physical Data Model
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" :class="{ active: isActive('/sql') }" href="/sql" >
            <i class="fa fa-wrench"></i> Generate SQL Code
          </a>
        </li>
      </ul>
    </template>
  </BasePageHeading>



  <div class="content" style="overflow: auto; height: 70vh">

    <div class="file-upload ">
      <BaseBlock title="Import JSON File" class="h-100 mb-3" content-class="fs-sm">
        <input v-if="!loading" class="mb-2" id="file-input" type="file" @change="handleFileUpload" />
        <p v-if="!loading" class="text-danger">This file had to be graph from <em><a class="text-danger" href="/app">previous module</a></em>.</p>
        <p v-if="loading"><div class="col-6 col-md-3"><i class="fa fa-3x fa-cog fa-spin"></i></div></p>
      </BaseBlock>
    </div>
    <div class="file-upload">
    <button v-if="tables" class="btn btn-alt-primary ms-2" @click="saveJSONToFile">Export tables</button>
    </div>

    <VueFlow
    :nodes="nodes"
    :edges="edges"
    :fit-view="true"
    :allow-duplicate-edges="false"

    @edge-update="onEdgeUpdate"
    @connect="onConnect"
    @edge-update-start="onEdgeUpdateStart"
    @edge-update-end="onEdgeUpdateEnd"
    @update:node="updateNode"
    @nodeMouseEnter="onNodeMouseEnter"
    @nodeMouseLeave="onNodeMouseLeave"
    :class="{ dark }"
    class="basic-flow"
    :default-viewport="{ zoom: 1.5 }"
    :min-zoom="0.2"
    :max-zoom="4"
    >
      <Background pattern-color="#aaa" :gap="16" />

      <!-- <SaveRestoreControls :onUpdateGraph="updateGraph" /> -->

      <!-- <EditBox /> -->

      <MiniMap />

      <template #node-PDMNode="customNodeProps">
        <PDMNode
          v-bind="customNodeProps"
          :id="customNodeProps.id"
        />
      </template>


      <Controls position="top-left">
        <ControlButton title="Reset Transform" @click="resetTransform">
          <Icon name="reset" />
        </ControlButton>

        <ControlButton title="Shuffle Node Positions" @click="updatePos">
          <Icon name="update" />
        </ControlButton>

        <ControlButton title="Toggle Dark Mode" @click="toggleDarkMode">
          <Icon v-if="dark" name="sun" />
          <Icon v-else name="moon" />
        </ControlButton>

        <ControlButton title="Log `toObject`" @click="logToObject">
          <Icon name="log" />
        </ControlButton>
      </Controls>

    </VueFlow>
  </div>

</template>

<style>
/* import the necessary styles for Vue Flow to work */
@import '@vue-flow/core/dist/style.css';

/* import the default theme, this is optional but generally recommended */
@import '@vue-flow/core/dist/theme-default.css';
@import 'https://cdn.jsdelivr.net/npm/@vue-flow/core@1.41.2/dist/style.css';
@import 'https://cdn.jsdelivr.net/npm/@vue-flow/core@1.41.2/dist/theme-default.css';
@import 'https://cdn.jsdelivr.net/npm/@vue-flow/controls@latest/dist/style.css';
@import 'https://cdn.jsdelivr.net/npm/@vue-flow/minimap@latest/dist/style.css';
@import 'https://cdn.jsdelivr.net/npm/@vue-flow/node-resizer@latest/dist/style.css';

html,
body,
#content {
  margin: 0;
  height: 100%;
}

#content {
  text-transform: uppercase;
  font-family: 'JetBrains Mono', monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


.vue-flow__minimap {
  transform: scale(75%);
  transform-origin: bottom right;
}

.vue-flow__panel {
    background-color:#2d3748;
    color:#fff;
    border-radius:8px;
    padding:8px;
    display:flex;
    flex-direction:row;
    gap:8px
}

.vue-flow__panel .field {
    display:flex;
    gap:8px;
    align-items:center
}

.vue-flow__panel label {
    display:blocK
}

.vue-flow__panel input {
    padding:2px;
    border-radius:5px
}

.vue-flow__panel .buttons {
    display:flex;
    gap:8px
}

.vue-flow__panel button {
    border:none;
    cursor:pointer;
    background-color:#4a5568;
    border-radius:8px;
    border:none !important;
    box-shadow:0 0 10px #0000004d;
    fill: white;

    display:flex;
    align-items:center;
    justify-content:center
}

.vue-flow__panel button:hover {
    background-color:#2563eb;
    transition:background-color .2s
}

.vue-flow__panel button svg {
    width:100%;
    height:100%;
    color:white;
}

.basic-flow.dark {
    background:#2d3748;
    color:#fffffb
}

.basic-flow.dark .vue-flow__node {
    background:#4a5568;
    color:#fffffb
}

.basic-flow.dark .vue-flow__node.selected {
    background:#333;
    box-shadow:0 0 0 2px #2563eb
}

.basic-flow .vue-flow__controls {
    display:flex;
    flex-wrap:wrap;
    justify-content:center
}

.basic-flow.dark .vue-flow__controls {
    border:1px solid #FFFFFB
}

.basic-flow .vue-flow__controls .vue-flow__controls-button {
    border:none;
    border-right:1px solid #eee
}

.basic-flow .vue-flow__controls .vue-flow__controls-button svg {
    height:100%;
    width:100%
}

.basic-flow.dark .vue-flow__controls .vue-flow__controls-button {
    background:#333;
    fill:#fffffb;
    border:none
}

.basic-flow.dark .vue-flow__controls .vue-flow__controls-button:hover {
    background:#4d4d4d
}

.basic-flow.dark .vue-flow__edge-textbg {
    fill:#292524
}

.basic-flow.dark .vue-flow__edge-text {
    fill:#fffffb
}

.file-upload {
  margin-bottom: 20px;
}

.file-upload label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

.file-upload input[type="file"] {
  display: block;
}


</style>