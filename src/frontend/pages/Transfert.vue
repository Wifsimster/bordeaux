<template>
  <div class="p:1">
    <alert color="red" v-if="error">{{ error }}</alert>
    <alert v-if="message && message.results && message.results.length > 0">
      <p>Files to transfert :</p>
      <ul class="list-reset py:1 px:1/2">
        <li v-for="item in results" :key="item">{{ item }}</li>
      </ul>
    </alert>
    <alert v-if="hasEpisodes">
      <p>Episodes found :</p>
      <ul class="list-reset py:1 px:1/2">
        <li v-for="item in episodes" :key="item">{{ item.file }}</li>
      </ul>
    </alert>
    <alert v-if="hasNoEpisode">No espiode found on {{ from }}/ :(</alert>
    <loader v-if="isLoading" :message="loadingMessage"></loader>
    <btn v-if="!isLoading" @click="search()">Search new files on {{ from }}/</btn>
    <btn v-if="hasEpisodes && !isLoading" @click="transfert()">Transfert</btn>
  </div>
</template>

<script>
export default {
  computed: {
    hasEpisodes() {
      return this.episodes && this.episodes.length > 0;
    },
    hasNoEpisode() {
      return this.episodes && this.episodes.length === 0;
    },
    message() {
      return this.$store.getters["webSocket/message"];
    }
  },
  data() {
    return {
      error: null,
      from: "w:",
      to: "z:",
      episodes: null,
      results: null,
      isLoading: false,
      loadingMessage: null
    };
  },
  created() {
    this.search();
  },
  watch: {
    message(data) {
      if (data.object === "transfert") {
        switch (data.method) {
          case "search":
            this.isLoading = false;
            if (data.error) {
              this.error = data.error;
            } else {
              this.episodes = Object.assign([], data.results);
            }
            break;
          case "run":
            this.isLoading = false;
            if (data.error) {
              this.error = data.error;
            } else {
              this.results = Object.assign([], data.results);
            }
            break;
          default:
            console.log(`Unknow method : ${data.method}`);
        }
      }
    }
  },
  methods: {
    search() {
      this.isLoading = true;
      this.loadingMessage = `Searching new files on ${this.from}...`;
      this.$store.commit("webSocket/send", {
        object: "transfert",
        method: "search",
        params: { from: this.from, to: this.to }
      });
    },
    transfert() {
      this.isLoading = true;
      this.loadingMessage = `Transfering files to ${this.to}...`;
      this.$store.commit("webSocket/send", {
        object: "transfert",
        method: "run",
        params: { from: this.from, to: this.to }
      });
    }
  }
};
</script>
