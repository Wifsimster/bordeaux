<template>
  <div>
    <alert color="red" v-if="error">{{ error }}</alert>
    <div class="px:1">
      <div class="text:3/2">Directories</div>
      <form v-if="settings">
        <input
          type="text"
          v-model="settings.from"
          @click="openExplorerFrom = true"
          readonly
          placeholder="Path to scan for new download"
        />
        <input
          type="text"
          v-model="settings.to"
          @click="openExplorerTo = true"
          readonly
          placeholder="Path to scan for existing shows"
        />
      </form>
      <explorer v-if="openExplorerFrom" @close="openExplorerFrom = false" @selected="fromSelected"></explorer>
      <explorer v-if="openExplorerTo" @close="openExplorerTo = false" @selected="toSelected"></explorer>
    </div>
  </div>
</template>

<script>
import Explorer from "components/Explorer.vue";
export default {
  name: "directory",
  components: {
    Explorer
  },
  computed: {
    message() {
      return this.$store.getters["webSocket/message"];
    }
  },
  data() {
    return {
      error: null,
      settings: null,
      openExplorerFrom: false,
      openExplorerTo: false
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
        }
      }
    }
  },
  methods: {
    fromSelected(val) {
      this.settings.from = val;
      this.openExplorerFrom = false;
    },
    toSelected(val) {
      this.settings.to = val;
      this.openExplorerTo = false;
    },
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