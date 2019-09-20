<template>
  <div class="sm:min-w:sm">
    <alert color="red" v-if="error">{{ error }}</alert>
    <div>
      <div class="text:white text:3/2">Subtitles</div>
      <div class="text:grey-dark">Manage subtitles</div>
      <form v-if="settings">
        <div class="relative mx:2">
          <input id="languages" type="text" v-model="settings.languages" placeholder="en, fr" />
          <label for="languages">Languages</label>
        </div>
        <div class="relative mx:2">
          <input id="daysOld" type="number" v-model="settings.daysOld" placeholder="2" />
          <label for="daysOld">Days old for manual search</label>
        </div>
        <div class="relative mx:2">
          <input
            id="downloadAfterTransfert"
            type="checkbox"
            v-model="settings.downloadAfterTransfert"
          />
          <label for="downloadAfterTransfert">Download after transfert</label>
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
    "settings.languages"(newVal, oldVal) {
      this.update();
    },
    "settings.downloadAfterTransfert"(newVal, oldVal) {
      this.update();
    },
    "settings.daysOld"(newVal, oldVal) {
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
    },
    isValid() {
      this.$emit(
        "is-valid",
        this.settings.languages && this.settings.languages.length > 0
      );
    }
  }
};
</script>

<style lang="scss" scoped>
</style>