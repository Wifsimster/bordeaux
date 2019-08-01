<template>
  <div class="min-w:xs max-w:sm">
    <alert color="red" v-if="error">{{ error }}</alert>
    <alert color="green" v-if="testOk">Test is OK !</alert>
    <div class="p:1">
      <div class="text:white text:3/2">Transmission</div>
      <form v-if="settings">
        <input v-model="settings.host" placeholder="Host" />
        <input type="number" v-model="settings.port" placeholder="Port" />
        <input v-model="settings.username" placeholder="Username" />
        <input type="password" v-model="settings.password" placeholder="Password" />
        <btn @click="test()">Test</btn>
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
      settings: null,
      isLoading: false,
      testOk: null
    };
  },
  created() {
    this.getAll();
  },
  watch: {
    "settings.host"(newVal, oldVal) {
      if (oldVal) {
        this.update();
      }
    },
    "settings.port"(newVal, oldVal) {
      if (oldVal) {
        this.update();
      }
    },
    "settings.username"(newVal, oldVal) {
      if (oldVal) {
        this.update();
      }
    },
    "settings.password"(newVal, oldVal) {
      if (oldVal) {
        this.update();
      }
    },
    message(data) {
      if (data.object === "transmission") {
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
          case "sessionStats":
            if (data.error) {
              this.error = data.error;
            } else {
              this.testOk = true;
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
        object: "transmission",
        method: "getAll"
      });
    },
    update() {
      this.$store.commit("webSocket/send", {
        object: "transmission",
        method: "update",
        params: this.settings
      });
    },
    test() {
      this.testOk = null;
      this.$store.commit("webSocket/send", {
        object: "transmission",
        method: "sessionStats",
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
