<template>
  <article class="grid-item">
    <p class="badge">{{index + 1}}</p>
    {{ channel.name }}
    <div class="move-channel">
      <Button @click="moveChannel(index - 1, index)" shape="circle">⬅</Button>
      <input
        type="number"
        class="new-index"
        @change="change"
        :value="index + 1"
      >
      <Button @click="moveChannel(index + 1, index)" shape="circle">➡</Button>
    </div>
  </article>
</template>

<script>
export default {
  props: ['index', 'channel', 'moveChannel'],
  methods: {
    change(data) {
      if (data.target && data.target.value) {
        // eslint-disable-next-line radix
        this.moveChannel(parseInt(data.target.value) - 1, this.index);
      }
    },
  },
};
</script>

<style>
.grid-item {
  box-sizing: border-box;
  text-align: center;
  font-size: 1.1em;
  border: dashed 1px #000;
  border-radius: 15px;
  margin: 5px;
  position: relative;
  padding-left: 0;
  padding-right: 0;
  padding-top: 2em;
  padding-bottom: 1.5em;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  cursor: move;
  background:linear-gradient(135deg, #fcdf8a 0%,#f38381 100%);
}
.grid-item:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

.badge {
  position: absolute;
  margin: 2px;
  top: 0px;
  left: 0px;
  background-color: rgb(255, 81, 81);
  color: #000;
  border-radius: 15px;
  height: 30px;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
}
.new-index {
  width: 50%;
  height: 100%;
}
</style>
