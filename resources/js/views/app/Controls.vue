<script setup>
import { ref } from 'vue'
import { Panel, useVueFlow } from '@vue-flow/core'
import Icon from './Icon.vue'

const { nodes, edges, addNodes, dimensions, toObject, fromObject } = useVueFlow()

const newNodes = ref([{}]);
const newEdges = ref([{}]);

const props = defineProps(['onUpdateGraph']);

function onSave() {
  const data = toObject();
  const jsonString = JSON.stringify(data, null, 2);

  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'data.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);
}

async function onUpload() {
  try {
    let file;

    if (window.showOpenFilePicker) {
      const [fileHandle] = await window.showOpenFilePicker({
        types: [
          {
            description: 'JSON Files',
            accept: { 'application/json': ['.json'] },
          },
        ],
        multiple: false,
      });
      file = await fileHandle.getFile();
    } else {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json';

      file = await new Promise((resolve, reject) => {
        input.onchange = (e) => resolve(e.target.files[0]);
        input.onerror = reject;
        input.click();
      });
    }

    const text = await file.text();
    const data = JSON.parse(text);

    if (data.nodes && data.edges) {
      newNodes.value = data.nodes;
      newEdges.value = data.edges;
      props.onUpdateGraph(newNodes.value, newEdges.value);
    } else {
      alert('Invalid graph data.');
    }

  } catch (err) {
    console.error('Error loading file:', err);

    if (err.name === 'AbortError') {
      alert('File selection was canceled.');
    } else if (err.name === 'NotAllowedError') {
      alert('Permission denied. Check browser settings.');
    } else {
      alert('Failed to load file.');
    }
  }
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
