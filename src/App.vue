<template>
  <div id="app">
    <actions
      :selectedFile="selectedFile"
      :saveFile="saveFile"
      :file="file.name"
      :loadDataFromStorage="loadDataFromStorage"
      :hasSavedData="hasSavedData"
    />
    <grid :data="data" :moveChannel="moveChannel" />
  </div>
</template>

<script>
const FileSaver = () => import('file-saver');
const parser = () => import('iptv-playlist-parser');

const Grid = () => import('./components/Grid.vue');
const Actions = () => import('./components/Actions.vue');

export default {
  name: 'app',
  components: {
    Grid,
    Actions,
  },
  data: () => ({
    text: '',
    data: {
      header: {},
      items: [],
    },
    file: {
      name: '',
    },
    hasSavedData: false,
  }),
  mounted() {
    const data = localStorage.getItem('data');
    if (data) this.hasSavedData = true;
  },
  methods: {
    startSaveData() {
      setInterval(
        () => {
          localStorage.setItem('data', JSON.stringify(this.data));
          localStorage.setItem('filename', this.file.name);
          this.hasSavedData = true;
        },
        3000,
      );
    },
    selectedFile({ target: { files } }) {
      [this.file] = files;

      const reader = new FileReader();
      reader.readAsText(this.file, 'UTF-8');
      reader.onload = (evt) => {
        this.text = evt.target.result;
        parser().then(({ default: fileParser }) => {
          this.data = fileParser.parse(this.text);
          this.startSaveData();
        });
      };
    },
    moveChannel(moveTo, moveFrom) {
      const element = this.data.items[moveFrom];
      this.data.items.splice(moveFrom, 1);
      this.data.items.splice(moveTo, 0, element);
    },
    saveFile() {
      const fileData = [this.data.header.raw, ...this.data.items.map(item => item.raw)].join('\n');
      const blob = new Blob([fileData], { type: 'audio/x-mpegurl' });
      FileSaver().then(({ default: saver }) => {
        saver.saveAs(blob, this.file.name);
      });
    },
    loadDataFromStorage() {
      const data = localStorage.getItem('data');
      if (data) {
        try {
          this.data = JSON.parse(data);
          // eslint-disable-next-line no-empty
          try { this.file.name = localStorage.getItem('filename'); } catch {}
        } catch {
          this.hasSavedData = false;
        }
      }
      this.startSaveData();
    },
  },
};
</script>
