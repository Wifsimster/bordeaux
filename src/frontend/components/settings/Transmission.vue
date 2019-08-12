<template>
  <div>
    <div class="px:1">
      <div class="text:3/2">
        Transmission
        <span
          v-if="testOk"
          class="inline-block rounded:full bg:green ml:1/4 p:1/3 align:middle"
        ></span>
        <span v-else class="inline-block rounded:full bg:red ml:1/4 p:1/3 align:middle"></span>
      </div>
      <form v-if="settings">
        <input v-model="settings.host" placeholder="Host" />
        <input type="number" v-model="settings.port" placeholder="Port" />
        <input v-model="settings.username" placeholder="Username" />
        <input type="password" v-model="settings.password" placeholder="Password" />
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
      testOk: null
    };
  },
  created() {
    this.getAll();
    this.test();
  },
  watch: {
    "settings.host"(newVal, oldVal) {
      if (oldVal) {
        this.update();
        this.test();
      }
    },
    "settings.port"(newVal, oldVal) {
      if (oldVal) {
        this.update();
        this.test();
      }
    },
    "settings.username"(newVal, oldVal) {
      if (oldVal) {
        this.update();
        this.test();
      }
    },
    "settings.password"(newVal, oldVal) {
      if (oldVal) {
        this.update();
        this.test();
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
              this.$emit("is-valid", false);
            } else {
              this.testOk = true;
              this.$emit("is-valid", true);
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
