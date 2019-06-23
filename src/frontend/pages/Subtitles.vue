<template>
  <card>
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
      <btn v-if="!isLoading" @click="search()">Search recent files on {{ from }}/</btn>
      <btn v-if="hasEpisodes && !isLoading" @click="run()">Search for subtitles</btn>
    </div>
  </card>
</template>

<script>
export default {
  data() {
    return {
      error: null,
      message: null,
      episodes: null,
      ws: null,
      from: "z:",
      isLoading: false,
      loadingMessage: null,
      fileAge: 2
    };
  },
  computed: {
    hasEpisodes() {
      return this.episodes && this.episodes.length > 0;
    },
    hasNoEpisode() {
      return this.episodes && this.episodes.length === 0;
    }
  },
  created() {
    this.ws = new WebSocket("ws://localhost:8080/subtitles");

    this.ws.onopen = evt => {
      this.search();

      this.ws.onmessage = evt => {
        const data = JSON.parse(evt.data);
        switch (data.method) {
          case "getRecentEpisodes":
            this.isLoading = false;
            if (data.error) {
              this.error = data.error;
            } else {
              this.episodes = data.results;
            }
            break;
          case "run":
            this.isLoading = false;
            if (data.error) {
              this.error = data.error;
            } else {
              this.message = data.results;
            }
            break;
          default:
            console.log(`Unknow method : ${data.method}`);
        }
      };
    };
  },
  methods: {
    search() {
      this.episodes = null;
      this.isLoading = true;
      this.loadingMessage = `Searching ${this.from}/ for recent episodes (${
        this.fileAge
      } days old)...`;
      this.ws.send(
        JSON.stringify({
          method: "search",
          params: { from: this.from, fileAge: this.fileAge }
        })
      );
    },
    run() {
      this.isLoading = true;
      this.loadingMessage = `Searching subtitles...`;
      this.ws.send(
        JSON.stringify({
          method: "run",
          params: { from: this.from }
        })
      );
    }
  }
};
</script>
