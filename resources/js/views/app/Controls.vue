<script setup>
import { Panel, useVueFlow } from '@vue-flow/core'
import Icon from './Icon.vue'

const flowKey = 'vue-flow--save-restore'

const { nodes, addNodes, dimensions, toObject, fromObject } = useVueFlow()

function onSave() {
  localStorage.setItem(flowKey, JSON.stringify(toObject()))
}

function onRestore() {
  const flow = JSON.parse(localStorage.getItem(flowKey))

  if (flow) {
    fromObject(flow)
  }
}

function onAddEntityNode() {
  const id = nodes.value.length + 1

  const newNode = {
    id: `e${id}`,
    type: `entityType`,
    label: ``,
    position: { x: Math.random() * dimensions.value.width, y: Math.random() * dimensions.value.height },
  }

  addNodes([newNode])
}

function onAddAttributeNode() {
  const id = nodes.value.length + 1

  const newNode = {
    id: `a${id}`,
    type: `attributeType`,
    label: ``,
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
      <button title="restore graph" @click="onRestore">
        <Icon name="restore" />
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
    background-color:#2d3748;
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
    background-color:#2563eb;
    transition:background-color .2s
}

.vue-flow__panel button svg {
    width:100%;
    height:100%
}
</style>
