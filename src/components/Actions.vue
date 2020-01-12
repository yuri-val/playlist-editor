<template>
  <div class="actions">
    <label for="file" class="btn btn-open">
      <file-find-outline-icon />
      {{file ? file : 'Select playlist file (*.m3u, *.m3u8)...'}}
    </label>
    <input id="file" type="file" name="file" @change="selectedFile" />
    <label v-if="hasSavedData" class="btn btn-load" @click="loadDataFromStorage">
      <database-export-icon />
      Load from storage ...
    </label>
    <label class="btn btn-save" @click="saveFile">
      <content-save-icon />
      Save...
    </label>
  </div>
</template>

<script>
const ContentSaveIcon = () => import('vue-material-design-icons/ContentSave.vue');
const FileFindOutlineIcon = () => import('vue-material-design-icons/FileFindOutline.vue');
const DatabaseExportIcon = () => import('vue-material-design-icons/DatabaseExport.vue');

export default {
  props: ['selectedFile', 'saveFile', 'file', 'loadDataFromStorage', 'hasSavedData'],
  components: {
    ContentSaveIcon,
    FileFindOutlineIcon,
    DatabaseExportIcon,
  },
};
</script>

<style>

#file {
  display: none;
}

.float-right {
  float: right;
}

.actions {
  margin-bottom: 10px
}

.btn {
  color: black;
  background-color: white;
  padding: 8px 20px;
  border-radius: 8px;
  font-size: 20px;
  font-weight: bold;
  margin-left: 10px;
  margin-right: 10px;
  cursor: pointer;
}

.btn-save {background-image: linear-gradient(to right, #16A085 0%, #F4D03F 51%, #16A085 100%)}
label.btn-save:hover { background-position: right center; }

.btn-open {background-image: linear-gradient(to right, #02AAB0 0%, #00CDAC 51%, #02AAB0 100%)}
.btn-open:hover { background-position: right center; }

.btn-load {background-image: linear-gradient(to right, #757F9A 0%, #D7DDE8 51%, #757F9A 100%)}
.btn-load:hover { background-position: right center; }

.upload-btn-wrapper input[type=file] {
  font-size: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}

</style>
