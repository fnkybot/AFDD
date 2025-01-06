<script setup>
import { ref } from 'vue'
import { Panel, useVueFlow } from '@vue-flow/core'
import Icon from './Icon.vue'

const flowKey = 'vue-flow--save-restore'

const { nodes, edges, addNodes, dimensions, toObject, fromObject } = useVueFlow()

const newNodes = ref([{}]);
const newEdges = ref([{}]);

const props = defineProps(['onUpdateGraph']);


function onSave() {

  const data = toObject();
  // Konwertuj obiekt na JSON
  const jsonString = JSON.stringify(data, null, 2); // Użyj null, 2 do formatowania w JSON

  // Stwórz Blob z danymi JSON
  const blob = new Blob([jsonString], { type: 'application/json' });

  // Stwórz URL dla Bloba
  const url = URL.createObjectURL(blob);

  // Utwórz element a, aby umożliwić pobranie pliku
  const a = document.createElement('a');
  a.href = url;
  a.download = 'data.json'; // Ustal nazwę pliku
  document.body.appendChild(a);
  a.click(); // Kliknij link, aby rozpocząć pobieranie
  document.body.removeChild(a); // Usuń link po pobraniu

  // Zwolnij URL
  URL.revokeObjectURL(url);
}

async function onUpload() {
  try {
    // Wyświetlenie okna dialogowego do wyboru pliku
    const [fileHandle] = await window.showOpenFilePicker({
      types: [
        {
          description: 'JSON Files',
          accept: { 'application/json': ['.json'] },
        },
      ],
      multiple: false,
    });

    // Odczytanie zawartości pliku
    const file = await fileHandle.getFile();
    const text = await file.text();

    // Parsowanie JSON i aktualizacja danych grafu
    const data = JSON.parse(text);
    if (data.nodes && data.edges) {
      newNodes.value = data.nodes;
      newEdges.value = data.edges;
    } else {
      alert('Invalid graph data.');
    }
  } catch (err) {
    console.error('Error loading file:', err);
    alert('Failed to load file.');
  }

  props.onUpdateGraph(newNodes.value, newEdges.value);
}

function onRestore() {
  if (nodes.value.length || edges.value.length ) props.onUpdateGraph([{}], [{}]);
}

function onAddEntityNode() {
  const id = nodes.value.length + 1

  const newNode = {
    id: `e${id}`,
    type: `entityType`,
    data: {
      label: `Entity`,
      bgColor: `#ffffff`,
    },
    position: { x: Math.random() * dimensions.value.width, y: Math.random() * dimensions.value.height },
  }

  addNodes([newNode])
}

function onAddAttributeNode() {
  const id = nodes.value.length + 1

  const newNode = {
    id: `a${id}`,
    type: `attributeType`,
    data: {
      label: `id`,
      nodeType: `INT`,
      isPrimaryKey: false,
      bgColor: `#ffffff`
    },
    position: { x: Math.random() * dimensions.value.width, y: Math.random() * dimensions.value.height },
  }

  addNodes([newNode])
}

function onAddRelationshipNode() {
  const id = nodes.value.length + 1

  const newNode = {
    id: `r${id}`,
    type: `relationshipType`,
    label: ``,
    bgColor: `#ffffff`,
    position: { x: Math.random() * dimensions.value.width, y: Math.random() * dimensions.value.height },
  }

  addNodes([newNode])
}
</script>

<template>
  <Panel position="top-right">
    <div class="buttons">

      <button title="add entity node" @click="onAddEntityNode">
        <Icon name="rectangle" />
      </button>
      <button title="add attribute node" @click="onAddAttributeNode">
        <Icon name="eclipse" />
      </button>
      <button title="add relationship node" @click="onAddRelationshipNode">
        <Icon name="diamond" />
      </button>
      <button title="save graph" @click="onSave">
        <Icon name="save" />
      </button>
      <button title="upload graph" @click="onUpload" >
      <Icon name="upload" />
      </button>
      <!-- <button title="upload graph" @click="onUpload">
        <Icon name="upload" />
      </button> -->
      <button title="clear graph" @click="onRestore">
        <Icon name="delete" />
      </button>

    </div>
  </Panel>
</template>

<style scoped>

html,
body,
#app {
  margin: 0;
  height: 100%;
}

#app {
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
    background-color:#303e44;
    padding:10px;
    border-radius:8px;
    box-shadow:0 0 10px #00000080
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
    color:#fff;
    box-shadow:0 0 10px #0000004d;
    width:40px;
    height:40px;
    font-size:16px;
    display:flex;
    align-items:center;
    justify-content:center
}

.vue-flow__panel button:hover {
    background-color:#069fba;
    transition:background-color .2s
}

.vue-flow__panel button svg {
    width:100%;
    height:100%
}
</style>
