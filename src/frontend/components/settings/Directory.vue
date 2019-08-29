<template>
  <div>
    <alert color="red" v-if="error">{{ error }}</alert>
    <div class="px:1">
      <div class="text:3/2">Directories</div>
      <div class="text:grey-dark">Directories scan.</div>
      <form v-if="settings">
        <div class="relative mx:2">
          <input
            id="from"
            type="text"
            v-model="settings.from"
            @click="openExplorerFrom = true"
            readonly
            placeholder="Path to new download"
          />
          <label for="from">New download</label>
        </div>
        <div class="relative mx:2">
          <input
            id="to"
            type="text"
            v-model="settings.to"
            @click="openExplorerTo = true"
            readonly
            placeholder="Path to your existing shows"
          />
          <label for="to">Existing tv shows</label>
        </div>
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
      this.update();
    },
    toSelected(val) {
      this.settings.to = val;
      this.openExplorerTo = false;
      this.update();
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