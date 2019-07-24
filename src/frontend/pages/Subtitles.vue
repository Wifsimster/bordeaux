<template>
  <div class="p:1">
    <alert color="red" v-if="error">{{ error }}</alert>
    <alert v-if="hasEpisodes">
      <p>Recent episodes found :</p>
      <ul class="list-reset pl:1 px:1/2">
        <li v-for="item in episodes" :key="item.id">{{ item }}</li>
      </ul>
    </alert>
    <alert v-if="hasNoEpisode">
      <p>No recent episode found :(</p>
    </alert>
    <loader v-if="isLoading" :message="loadingMessage"></loader>
    <btn v-if="!isLoading" @click="search()">Search recent files</btn>
    <btn v-if="hasEpisodes && !isLoading" @click="run()">Search for subtitles</btn>
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
      episodes: null,
      results: null,
      isLoading: false,
      loadingMessage: null,
      fileAge: 2
    };
  },
  created() {
    this.search();
  },
  watch: {
    message(data) {
      if (data.object === "subtitles") {
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
      this.episodes = null;
      this.isLoading = true;
      this.loadingMessage = `Searching recent episodes (${this.fileAge} days old)...`;
      this.$store.commit("webSocket/send", {
        object: "subtitles",
        method: "search",
        params: { fileAge: this.fileAge }
      });
    },
    run() {
      this.isLoading = true;
      this.loadingMessage = `Searching subtitles...`;
      this.$store.commit("webSocket/send", {
        object: "subtitles",
        method: "run"
      });
    }
  }
};
</script>
