
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { ControlButton, Controls, } from '@vue-flow/controls'
import EditBox from './EditBox.vue'
import { MiniMap } from '@vue-flow/minimap'
import { initialEdges, initialNodes } from './initial-elements.js'
import Icon from './Icon.vue'

/**
 * `useVueFlow` provides:
 * 1. a set of methods to interact with the VueFlow instance (like `fitView`, `setViewport`, `addEdges`, etc)
 * 2. a set of event-hooks to listen to VueFlow events (like `onInit`, `onNodeDragStop`, `onConnect`, etc)
 * 3. the internal state of the VueFlow instance (like `nodes`, `edges`, `viewport`, etc)
 */
const { onInit, onNodeDragStop, onConnect, addEdges, updateEdge, setViewport, toObject, removeEdges } = useVueFlow()
const bgColor = ref('#eeeeee')
const nodes = ref(initialNodes)

const edges = ref(initialEdges)
const selectedEdges = ref([]);

function onEdgeUpdateStart(edge) {
  console.log('start update', edge)
}

function onEdgeUpdateEnd(edge) {
  console.log('end update', edge)
}

function onEdgeUpdate({ edge, connection }) {
  updateEdge(edge, connection)
}

// our dark mode toggle flag
const dark = ref(false)

import EntityNode from './EntityNode.vue';
import AttributeNode from './AttributeNode.vue';
import RelationshipNode from './RelationshipNode.vue';

import SaveRestoreControls from './Controls.vue'

/**
 * This is a Vue Flow event-hook which can be listened to from anywhere you call the composable, instead of only on the main component
 * Any event that is available as `@event-name` on the VueFlow component is also available as `onEventName` on the composable and vice versa
 *
 * onInit is called when the VueFlow viewport is initialized
 */
onInit((vueFlowInstance) => {
  // instance is the same as the return of `useVueFlow`
  vueFlowInstance.fitView()
})

/**
 * onNodeDragStop is called when a node is done being dragged
 *
 * Node drag events provide you with:
 * 1. the event object
 * 2. the nodes array (if multiple nodes are dragged)
 * 3. the node that initiated the drag
 * 4. any intersections with other nodes
 */
onNodeDragStop(({ event, nodes, node }) => {
  console.log('Node Drag Stop', { event, nodes, node })
})

/**
 * onConnect is called when a new connection is created.
 *
 * You can add additional properties to your new edge (like a type or label) or block the creation altogether by not calling `addEdges`
 */
onConnect((params) => {
  //edges.value.push({ ...params,  type: 'smoothstep' });

  const exists = edges.value.some(
        (edge) =>
          edge.source === params.source &&
          edge.sourceHandle === params.sourceHandle &&
          edge.target === params.target &&
          edge.targetHandle === params.targetHandle
      );

  // Dodaj nowe połączenie tylko, jeśli jeszcze nie istnieje
  if (!exists) {
    const uniqueId = `edge-${params.source}-${params.sourceHandle}-${params.target}-${params.targetHandle}`;
    edges.value.push({ id: uniqueId, ...params, type: 'smoothstep' });
  }

  return { nodes, edges, onConnect };

  //this.edges.push({ ...connection, id: `e${connection.source}-${connection.target}` });
  //addEdges(connection)
})


/**
 * To update a node or multiple nodes, you can
 * 1. Mutate the node objects *if* you're using `v-model`
 * 2. Use the `updateNode` method (from `useVueFlow`) to update the node(s)
 * 3. Create a new array of nodes and pass it to the `nodes` ref
 */
function updatePos() {
  nodes.value = nodes.value.map((node) => {
    return {
      ...node,
      position: {
        x: Math.random() * 400,
        y: Math.random() * 400,
      },
    }
  })
}

/**
 * toObject transforms your current graph data to an easily persist-able object
 */
 function logToObject() {
  console.log(toObject())
  const data = toObject(); // Zakładam, że toObject() zwraca obiekt, który chcesz zapisać.

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


/**
 * Resets the current viewport transformation (zoom & pan)
 */
function resetTransform() {
  setViewport({ x: 0, y: 0, zoom: 1 })
}

function toggleDarkMode() {
  dark.value = !dark.value
}
</script>

<template>
  <Head title="App" />

  <BasePageHeading
    title="App"
    :subtitle="`Welcome ${$page.props.auth.user.name.split(' ')[0]}, everything looks good!`"
  >
    <template #extra>
      <button type="button" class="btn btn-alt-primary" v-click-ripple>
        <i class="fa fa-plus opacity-50 me-1"></i>
        Main Action
      </button>
    </template>
  </BasePageHeading>


  <div class="content" style="height: 70vh">
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

      <SaveRestoreControls />

      <EditBox />

      <MiniMap />

      <template #node-entityType="customNodeProps">
        <EntityNode
          v-bind="customNodeProps"
          :id="customNodeProps.id"
        />
      </template>

      <template #node-attributeType="customNodeProps">
        <AttributeNode
          v-bind="customNodeProps"
          :id="customNodeProps.id"
        />
      </template>

      <template #node-relationshipType="customNodeProps">
        <RelationshipNode
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

</style>