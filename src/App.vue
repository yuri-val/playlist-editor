<template>
  <div id="app">
    <div class="actions">
      <input type="file" ref="myFile" @change="selectedFile">
      <button @click="saveFile">Save New!</button>
    </div>
    <draggable v-model="data.items" class="grid-container">
      <article v-for="(ch, index) in data.items" :key="index" class="grid-item">
        <p class="badge">{{index + 1}}</p>
        {{ ch.name }}
        <div class="move-channel">
          <button @click="moveChannel(index - 1, index)">⬅</button>
          <input
            type="number"
            class="new-index"
            @change="({targer: {value}}) => moveChannel(parseInt(value) - 1, index)"
            :value="index + 1"
          >
          <button @click="moveChannel(index + 1, index)">➡</button>
        </div>
      </article>
    </draggable>
  </div>
</template>

<script>
import parser from 'iptv-playlist-parser';
import FileSaver from 'file-saver';
import draggable from 'vuedraggable';


export default {
  name: 'app',
  components: {
    draggable,
  },
  data: () => ({
    text: '',
    data: {
      header: {},
      items: [],
    },
  }),
  methods: {
    selectedFile() {
      console.log('selected a file');
      console.log(this.$refs.myFile.files[0]);

      const file = this.$refs.myFile.files[0];
      // if (!file || file.type !== 'text/plain') return;

      const reader = new FileReader();
      reader.readAsText(file, 'UTF-8');
      reader.onload = (evt) => {
        this.text = evt.target.result;
        this.data = parser.parse(this.text);
      };
      reader.onerror = (evt) => {
        console.error(evt);
      };
    },
    moveChannel(moveTo, moveFrom) {
      const element = this.data.items[moveFrom];
      this.data.items.splice(moveFrom, 1);
      this.data.items.splice(moveTo, 0, element);
    },
    saveFile() {
      const fileData = [this.data.header.raw, ...this.data.items.map(item => item.raw)];
      const blob = new Blob([fileData.join('\n')], { type: 'audio/x-mpegurl' });
      FileSaver.saveAs(blob, 'new_list.m3u');
    },
  },
};
</script>

<style>
#app {
  margin-top: 60px;
}
.grid-container {
  border: solid 2px #000;
  display: grid;
  grid-template-columns: repeat(auto-fit, 200px);
}

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
  border-radius: 15px;
  height: 30px;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
}
.move-channel {
  direction: flex;
  flex-flow: row;
}
.new-index {
  width: 35%
}
</style>
