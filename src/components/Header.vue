<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Header',
});
</script>

<template>
  <header class="flex justify-between border-b border-slate-200 px-10 py-8 mb-5">
    <nav>
      <ul class="flex items-center gap-10">
        <li class="flex items-center gap-3 text-gray-500 hover:text-black cursor-pointer">
          <router-link to="/">Task List</router-link></li>
        <li class="flex items-center gap-3 text-gray-500 hover:text-black cursor-pointer">
          <router-link to="/surveys">Survey List</router-link></li>
        <li class="flex items-center gap-3 text-gray-500 hover:text-black cursor-pointer">
          <router-link to="/bot-control">Bot Control</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
</style>
