<!-- src/App.vue -->
<template>
  <div id="app">
      <JsonEditor />
  </div>
</template>
<script>
import JsonEditor from './components/jsonEditor.vue';

export default {
  components: {
      JsonEditor
  }
};
</script>

<style>

body {
  max-width: 65% !important
}

</style>
