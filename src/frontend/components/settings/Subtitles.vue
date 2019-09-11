<template>
  <div>
    <alert color="red" v-if="error">{{ error }}</alert>
    <div class="px:1">
      <div class="text:white text:3/2">Subtitles</div>
      <div class="text:grey-dark">Manage subtitles</div>
      <form v-if="settings">
        <div class="relative mx:2">
          <input id="languages" type="text" v-model="settings.languages" placeholder="en, fr" />
          <label for="languages">Languages</label>
        </div>
        <div class="relative mx:2">
          <input
            id="afterTransfert"
            type="checkbox"
            v-model="settings.afterTransfert"
            placeholder="afterTransfert"
          />
          <label for="afterTransfert">Download after transfert</label>
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
      if (data.object === "subtitles") {
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
        object: "subtitles",
        method: "getAll"
      });
    },
    update() {
      this.$store.commit("webSocket/send", {
        object: "subtitles",
        method: "update",
        params: this.settings
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>