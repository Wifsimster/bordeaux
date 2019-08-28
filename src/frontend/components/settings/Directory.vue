<template>
  <div>
    <alert color="red" v-if="error">{{ error }}</alert>
    <div class="px:1">
      <div class="text:3/2">Directories</div>
      <form v-if="settings">
        <input type="text" v-model="settings.from" placeholder="Path to scan for new download" />
        <input type="text" v-model="settings.to" placeholder="Path to scan for existing shows" />
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "directory",
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
    "settings.from"() {
      this.update();
    },
    "settings.to"() {
      this.update();
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
              this.isValid();
            }
            break;
          case "update":
            if (data.error) {
              this.error = data.error;
            } else {
              this.settings = Object.assign({}, data.results);
              this.isValid();
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
    },
    isValid() {
      this.$emit("is-valid", this.settings.from && this.settings.to);
    }
  }
};
</script>