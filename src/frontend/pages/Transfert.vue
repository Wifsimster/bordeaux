<template>
  <div class="p:1">
    <alert color="red" v-if="error">{{ error }}</alert>

    <loader v-if="isLoading" :message="loadingMessage"></loader>

    <div v-if="!isLoading">
      <alert v-if="results">
        <p>Files transfert :</p>
        <ul class="list-reset py:1 px:1/2">
          <li v-for="(item, index) in results" :key="index">{{ item }}</li>
        </ul>
      </alert>

      <div v-if="hasEpisodes">
        <p>New episodes found :</p>
        <table class="border:collapse">
          <tbody>
            <tr v-for="episode in episodes" :key="episode.directory" class="hover:bg:grey-darker">
              <td>{{ episode.directory }}</td>
              <td>{{ episode.name }} {{ episode.season }}x{{ episode.episode }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>No espiode found :(</div>
    </div>

    <div class="flex w:full justify:center" v-if="!isLoading">
      <btn class="mr:1" @click="search()">Scan</btn>
      <btn v-if="hasEpisodes" @click="transfert()">Transfert</btn>
    </div>
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
      this.loadingMessage = `Searching new files...`;
      this.$store.commit("webSocket/send", {
        object: "transfert",
        method: "search"
      });
    },
    transfert() {
      this.isLoading = true;
      this.loadingMessage = `Transfering files to...`;
      this.$store.commit("webSocket/send", {
        object: "transfert",
        method: "run"
      });
    }
  }
};
</script>
