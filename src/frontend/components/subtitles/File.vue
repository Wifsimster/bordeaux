<template>
  <div class="flex:1">
    <div class="flex">
      <div class="flex:1">{{ item.file }}</div>
      <div class="flex:1">
        <loader v-if="isLoading"></loader>
        <div v-if="!isLoading && item.subtitle && item.subtitle.file">{{ item.subtitle.file }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    message() {
      return this.$store.getters["webSocket/message"];
    }
  },
  data() {
    return {
      isLoading: false
    };
  },
  watch: {
    message(data) {
      if (data.object === "subtitles") {
        switch (data.method) {
          case "getSubtitle":
            this.isLoading = false;
            if (data.error) {
              this.error = data.error;
            } else {
              if (this.item.file === data.params.file) {
                if (data.results) {
                  this.item.subtitle = Object.assign({}, data.results.subtitle);
                } else {
                  this.item.subtitle = {};
                }
              }
            }
            break;
        }
      }
    }
  }
};
</script>

