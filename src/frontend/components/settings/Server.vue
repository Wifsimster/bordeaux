<template>
  <div>
    <alert color="red" v-if="error">{{ error }}</alert>
    <div class="px:1">
      <div class="text:white text:3/2">Server</div>
      <div>Restart needed at any change.</div>
      <form v-if="settings">
        <div class="relative mx:2">
          <input id="host" type="text" v-model="settings.host" placeholder="localhost" />
          <label for="host">Host</label>
        </div>
        <div class="relative mx:2">
          <input id="port" type="text" v-model="settings.port" placeholder="8080" />
          <label for="port">Port</label>
        </div>
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
    "settings.host"(newVal, oldVal) {
      this.update();
    },
    "settings.port"(newVal, oldVal) {
      this.update();
    },
    message(data) {
      if (data.object === "server") {
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
        object: "server",
        method: "getAll"
      });
    },
    update() {
      this.$store.commit("webSocket/send", {
        object: "server",
        method: "update",
        params: this.settings
      });
    }
  }
};
</script>