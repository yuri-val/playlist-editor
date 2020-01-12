<template>
  <draggable v-model="data.items" class="grid-container">
    <channel
      v-for="(channel, index) in data.items"
      :key="index"
      :channel="channel"
      :index="index"
      :moveChannel="moveChannel"
    />
  </draggable>
</template>

<script>
const draggable = () => import('vuedraggable');

const Channel = () => import('./Channel.vue');

export default {
  props: ['data', 'moveChannel'],
  components: {
    draggable,
    Channel,
  },
};
</script>

<style>
.grid-container {
  border: solid 2px #000;
  display: grid;
  grid-template-columns: repeat(auto-fit, 200px);
  background: rgb(238,174,202);
  background: radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%);
}
</style>
