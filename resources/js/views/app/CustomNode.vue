<template>
  <div class="erd-node">
    <input
      v-model="nodeLabel"
      @blur="updateLabel"
      class="node-header"
      type="text"
    />
    <div class="fields">
      <div
        v-for="(field, index) in fields"
        :key="index"
        class="field"
      >
        <input
          v-model="fields[index]"
          @blur="updateField(index)"
          class="field-name"
          type="text"
        />
        <div
          class="connector"
          @mousedown="startConnect(field)"
          @mouseup="endConnect"
        ></div>
      </div>
    </div>
    <button @click="addField" class="add-field-button">Dodaj Atrybut</button>
  </div>
</template>

<script setup>
import { Position, Handle } from '@vue-flow/core'
import { defineProps, ref } from 'vue';
// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps(['data'])
// Ref to hold the editable label and fields
const nodeLabel = ref(props.data.label);
const fields = ref([...props.data.fields]);

// Update label on blur
function updateLabel() {
  props.data.label = nodeLabel.value; // Update parent data
}

// Update field on blur
function updateField(index) {
  props.data.fields[index] = fields.value[index]; // Update parent data
}

// Add a new field
function addField() {
  fields.value.push(''); // Add an empty field
  props.data.fields.push(''); // Also add to parent data
}

function startConnect(field) {
  console.log(`Connecting from ${field}`);
}
function endConnect() {
  // Logika kończenia połączenia
  console.log('Connection ended');
}

</script>

<style>
.erd-node {
  width: 300px; /* Szerokość węzła */
  padding: 10px;
  border: 2px solid #4caf50; /* Kolor ramki */
  border-radius: 8px;
  background-color: #f9f9f9; /* Tło węzła */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2); /* Cień dla efektu 3D */
  position: relative;
}

.node-header {
  font-weight: bold;
  font-size: 1.2em; /* Rozmiar czcionki nagłówka */
  text-align: center; /* Wyśrodkowanie nagłówka */
  margin-bottom: 10px; /* Odstęp poniżej nagłówka */
  background-color: #4caf50; /* Kolor tła nagłówka */
  color: white; /* Kolor tekstu nagłówka */
  padding: 5px; /* Wewnętrzny odstęp w nagłówku */
  border-radius: 5px; /* Zaokrąglenie krawędzi nagłówka */
  border: none; /* Usunięcie ramki */
}

.fields {
  display: flex;

  flex-direction: column; /* Układ w kolumnie */
}

.field {
  margin: 5px 0; /* Odstęp między atrybutami */

  position: relative; /* Umożliwia pozycjonowanie punktów połączeń */
}

.field-name {
  padding: 5px; /* Wewnętrzny odstęp dla atrybutów */
  width: 100%;
  border: 1px solid #ccc; /* Ramka dla atrybutów */
  border-radius: 4px; /* Zaokrąglenie krawędzi atrybutów */
  background-color: #fff; /* Tło atrybutu */
}

.connector {
  width: 10px;
  height: 10px;
  background-color: red; /* Kolor punktu połączenia */
  position: absolute;
  right: -15px; /* Odległość od prawej krawędzi */
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  border-radius: 50%; /* Zaokrąglenie punktu połączenia */
}

.add-field-button {
  margin-top: 10px;
  background-color: #4caf50; /* Kolor przycisku */
  color: white; /* Kolor tekstu przycisku */
  border: none; /* Usunięcie ramki */
  padding: 5px 10px; /* Wewnętrzny odstęp przycisku */
  border-radius: 5px; /* Zaokrąglenie krawędzi przycisku */
  cursor: pointer; /* Zmiana kursora na wskaźnik */
}
</style>