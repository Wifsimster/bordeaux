<template>
  <card>
    <div class="p:1">
      <h1>Transmission settings</h1>
      <div v-if="settings">
        <input v-model="settings.host" placeholder="Host" />
        <input type="number" v-model="settings.port" placeholder="Port" />
        <input v-model="settings.username" placeholder="Username" />
        <input type="password" v-model="settings.password" placeholder="Password" />
        <btn @click="test()">Test</btn>
      </div>
    </div>
  </card>
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
      isLoading: false
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
      console.log("TODO");
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../../../node_modules/beta-scss/scss/global";

input {
  @extend .shadow;
  @extend .border;
  @extend .rounded;
  @extend .w\:full;
  @extend .text\:grey-darkest;
  @extend .placeholder\:grey;
  @extend .p\:1;
  @extend .mx\:1;
  @extend .block;
}
</style>
