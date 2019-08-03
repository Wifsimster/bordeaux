<template>
  <div class="p:1">
    <alert color="red" v-if="error">{{ error }}</alert>

    <loader v-if="isLoading" :message="loadingMessage"></loader>

    <div v-if="!isLoading">
      <alert v-if="success" color="green">
        <p>Files transfert with success :)</p>
      </alert>

      <div v-if="hasEpisodes">
        <table class="border:collapse w:full">
          <thead>
            <tr>
              <th>Episode found</th>
              <th>Episode destination</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="episode in episodes" :key="episode.directory" class="hover:bg:grey-darker">
              <td>{{ episode.origin.file }}</td>
              <td>{{ episode.destination.path }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="text:center">No espiode found :(</div>
    </div>

    <div class="flex w:full justify:center mt:1" v-if="!isLoading">
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
      success: null,
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
              this.success = false;
            } else {
              this.success = true;
            }
            this.search();
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
      this.loadingMessage = `Transfering files...`;
      this.$store.commit("webSocket/send", {
        object: "transfert",
        method: "run"
      });
    }
  }
};
</script>
