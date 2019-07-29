<template>
  <div class="min-w:xs max-w:sm">
    <alert color="red" v-if="error">{{ error }}</alert>
    <div class="p:1">
      <div class="text:white text:3/2">Directories</div>
      <form v-if="settings">
        <input type="text" v-model="settings.from" placeholder="Path to scan for new download" />
        <input type="text" v-model="settings.to" placeholder="Path to scan for existing shows" />
      </form>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    message() {
      return this.$store.getters["webSocket/message"];
    }
  },
  data() {
    return {
      error: null,
      settings: null
    };
  },
  created() {
    this.getAll();
  },
  watch: {
    "settings.from"(newVal, oldVal) {
      if (oldVal) {
        this.update();
      }
    },
    "settings.to"(newVal, oldVal) {
      if (oldVal) {
        this.update();
      }
    },
    message(data) {
      if (data.object === "directory") {
        this.error = null;
        switch (data.method) {
          case "getAll":
            if (data.error) {
              this.error = data.error;
            } else {
              this.settings = Object.assign({}, data.results);
            }
            break;
          case "update":
            if (data.error) {
              this.error = data.error;
            } else {
              this.settings = Object.assign({}, data.results);
            }
            break;
          default:
            console.log(`Unknow method : ${data.method}`);
        }
      }
    }
  },
  methods: {
    getAll() {
      this.$store.commit("webSocket/send", {
        object: "directory",
        method: "getAll"
      });
    },
    update() {
      this.$store.commit("webSocket/send", {
        object: "directory",
        method: "update",
        params: this.settings
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../node_modules/beta-scss/scss/global";

input {
  height: 36px;
  caret-color: map-get($colors, "blue-dark");
  @extend .w\:full;
  @extend .text\:1;
  @extend .text\:grey;
  @extend .bg\:transparent;
  @extend .border\:b;
  @extend .border\:grey;
  @extend .placeholder\:grey-dark;
  @extend .mx\:1;
  @extend .block;
}
</style>
