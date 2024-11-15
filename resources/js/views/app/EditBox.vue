<script setup>
import { Panel, useVueFlow } from '@vue-flow/core'
import Icon from './Icon.vue'

</script>
<template>
  <Panel position="bottom-left">
    <div class="field">
      <label for="label">Label:</label>
      <input id="label" v-model="label" @input="handleUpdate" />
    </div>

    <div class="field">
      <label for="bgColor">Background color:</label>
      <input id="bgColor" v-model="bgColor" type="color" @input="handleUpdate" />
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
    color:#fff;
    border-radius:8px;
    padding:8px;
    display:flex;
    flex-direction:column;
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
</style>
