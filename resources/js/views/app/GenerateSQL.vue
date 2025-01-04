<script setup>
import { ref, onMounted } from "vue";
import hljs from "highlight.js";
import "highlight.js/styles/monokai.css"; // Możesz zmienić na inny styl, np. "github-dark.css"

const sqlCode = ref("");
const errorMessage = ref("");

onMounted(() => {
  document.querySelectorAll("pre code").forEach((block) => {
    hljs.highlightElement(block);
  });
});

function isActive(path) {
  return window.location.pathname === path;}
// Podświetlanie składni SQL po renderowaniu
const highlightSQL = () => {
  setTimeout(() => {
    document.querySelectorAll("pre code").forEach((block) => {
      hljs.highlightElement(block);
    });
  }, 100);
};

// Funkcja obsługująca plik JSON
const handleFileUpload = async (event) => {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const jsonData = JSON.parse(reader.result);
        // Pobierz token CSRF z meta tagu
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

        const response = await fetch("/api/convert-to-sql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken, // Dodaj token CSRF do nagłówków
          },
          body: JSON.stringify(jsonData),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Server error response:", errorText);
          throw new Error(`Server returned an error: ${response.status}`);
        }

        const result = await response.json();
        console.log("Generated SQL:", result.sql);
        sqlCode.value = result.sql;
        highlightSQL();
      } catch (error) {
        errorMessage.value = error.message;
        console.error("Error during SQL generation:", error);
      }
    };
    reader.readAsText(file);
  }
};

</script>

<template>
  <Head title="Generate SQL" />

  <BasePageHeading
    title="Generate SQL"
    :subtitle="`Welcome ${$page.props.auth.user.name.split(' ')[0]}, here you can generate SQL code from your physical model!`"
  >
    <template #extra>
      <ul class="nav nav-pills">
        <li class="nav-item me-1">
          <a class="nav-link" :class="{ active: isActive('/app') }" href="/app">
            <i class="fa fa-fw fa-home me-1"></i> Draw ERD Graph
          </a>
        </li>

        <li class="nav-item me-1">
          <a class="nav-link" :class="{ active: isActive('/pdm') }" href="/pdm">
            <i class="fa fa-fw fa-pencil-alt me-1"></i> Transform to Physical Data Model
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" :class="{ active: isActive('/sql') }" href="/sql">
            <i class="fa fa-wrench"></i> Generate SQL Code
          </a>
        </li>
      </ul>
    </template>
  </BasePageHeading>

  <div class="content">
    <div class="row">
      <div class="col-sm-6 col-xl-12">
        <BaseBlock title="Import JSON File" class="mb-3" content-class="fs-sm">
          <input type="file" class="mb-2" accept=".json" @change="handleFileUpload" />
          <p v-if="!loading" class="text-danger">This file had to be tables from <em><a class="text-danger" href="/pdm">previous module</a></em>.</p>
          <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>
        </BaseBlock>
      </div>

      <div class="col-sm-6 col-xl-12">
        <BaseBlock title="Generated SQL Code" class="h-100 mb-0" content-class="fs-sm">
          <pre v-if="sqlCode">
            <code class="sql">{{ sqlCode }}</code>
          </pre>
          <p v-else class="text-muted">Upload a JSON file to generate SQL code.</p>
        </BaseBlock>
      </div>
    </div>
  </div>
</template>
