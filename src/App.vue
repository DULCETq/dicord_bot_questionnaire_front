<script lang="ts">
import {defineComponent} from 'vue';
import Header from './components/Header.vue'

export default defineComponent({
  name: 'App',
  components: {Header},
});
</script>

<template>
  <div id="app">
    <Header/>
    <router-view></router-view>
  </div>
</template>

<style>

</style>