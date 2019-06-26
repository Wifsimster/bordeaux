<template>
  <card>
    <div class="p:1">
      <alert color="red" v-if="error">{{ error }}</alert>
      <alert v-if="message">
        <p>Transfert files :</p>
        <ul class="list-reset py:1 px:1/2">
          <li v-for="item in message" :key="item">{{ item }}</li>
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
  </card>
</template>

<script>
export default {
  data() {
    return {
      error: null,
      from: "w:",
      to: "z:",
      ws: null,
      message: null,
      episodes: null,
      isLoading: false,
      loadingMessage: null
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
    this.ws = new WebSocket("ws://localhost:8080/transfert");

    this.ws.onopen = evt => {
      this.search();

      this.ws.onmessage = evt => {
        const data = JSON.parse(evt.data);
        switch (data.method) {
          case "search":
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
      this.isLoading = true;
      this.loadingMessage = `Searching new files on ${this.from}...`;
      this.ws.send(
        JSON.stringify({
          method: "search",
          params: { from: this.from, to: this.to }
        })
      );
    },
    transfert() {
      this.isLoading = true;
      this.loadingMessage = `Transfering files to ${this.to}...`;
      this.ws.send(
        JSON.stringify({
          method: "run",
          params: { from: this.from, to: this.to }
        })
      );
    }
  }
};
</script>
