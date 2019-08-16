<template>
  <div>
    <div class="px:1">
      <div class="text:white text:3/2">
        Plex
        <span
          v-if="testOk"
          class="inline-block rounded:full bg:green ml:1/4 p:1/3 align:middle"
        ></span>
        <span v-else class="inline-block rounded:full bg:red ml:1/4 p:1/3 align:middle"></span>
      </div>
      <div>Used to get your collected and watched episodes.</div>
      <form v-if="settings">
        <input v-model="settings.username" placeholder="Username" />
        <input type="password" v-model="settings.password" placeholder="Password" />
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Plex",
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
      if (data.object === "plex") {
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
          case "signin":
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
        object: "plex",
        method: "getAll"
      });
    },
    update() {
      this.$store.commit("webSocket/send", {
        object: "plex",
        method: "update",
        params: this.settings
      });
    },
    test() {
      this.testOk = null;
      this.$store.commit("webSocket/send", {
        object: "plex",
        method: "signin"
      });
    }
  }
};
</script>
