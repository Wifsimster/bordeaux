<template>
  <card>
    <div class="p:1">
      <div class="text:3/2 text:bold mb:1">Latest episodes available on TPB</div>
      <alert color="red" v-if="error">{{ error }}</alert>
      <alert v-if="results">
        <p>Fichiers ajoutés à Transmission :</p>
        <ul class="list-reset pl:1 px:1/2">
          <li v-for="item in message" :key="item.id">{{ item.name }}</li>
        </ul>
      </alert>
      <loader v-if="isLoading"></loader>
      <div>
        Shows :
        <div v-for="(show, index) in shows" :key="show.id" class="mx:1">
          {{ show.title }}
          <span
            v-if="!show.magnetLink && !show.isLoading"
            class="border rounded bg:grey-light text:grey-darker px:1/4 py:1/2 cursor:pointer"
            @click="searchLatestEpisode(show, index)"
          >Search latest episode</span>
          <span
            v-if="show.isLoading"
            class="border rounded bg:grey-light text:grey-darker px:1/4 py:1/2"
          >Loading...</span>
          <span
            v-if="show.magnetLink && !show.isLoading"
            class="border rounded bg:grey-light text:grey-darker px:1/4 py:1/2 cursor:pointer"
            @click="addToTransmission(show.magnetLink, index)"
          >Ajouter à Transmission</span>
        </div>
      </div>
    </div>
  </card>
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
      results: null,
      shows: null,
      settings: null,
      isLoading: false
    };
  },
  created() {
    this.getTransmissionSettings();
    this.getShows();
  },
  watch: {
    message(data) {
      if (data.object === "transmission") {
        switch (data.method) {
          case "getAll":
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

      if (data.object === "download") {
        switch (data.method) {
          case "addToTransmission":
            this.isLoading = false;
            if (data.error) {
              this.error = data.error;
            } else {
              this.shows = this.shows.map((show, index) => {
                if (show.id === data.params.id) {
                  show.isLoading = false;
                  if (data.results) {
                    // TODO
                  }
                }
                return show;
              });
            }
            break;
          case "searchLatestEpisode":
            if (data.error) {
              this.error = data.error;
            } else {
              this.shows = this.shows.map((show, index) => {
                if (show.id === data.params.id) {
                  show.isLoading = false;
                  if (data.results) {
                    show.magnetLink = data.results;
                  } else {
                    show.magnetLink = null;
                  }
                }
                return show;
              });
            }
            break;
          case "getShows":
            if (data.error) {
              this.error = data.error;
            } else {
              if (data.results) {
                let shows = Object.assign([], data.results);
                this.shows = shows.map(item => ({
                  ...item,
                  isLoading: false,
                  magnetLink: null
                }));
              }
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
    getTransmissionSettings() {
      this.$store.commit("webSocket/send", {
        object: "transmission",
        method: "getAll"
      });
    },
    addToTransmission(magnetLink, index) {
      this.shows[index].isLoading = true;

      this.$store.commit("webSocket/send", {
        object: "download",
        method: "addToTransmission",
        params: { magnetLink, settings: this.settings }
      });
    },
    searchLatestEpisode(show, index) {
      this.shows[index].isLoading = true;

      this.$store.commit("webSocket/send", {
        object: "download",
        method: "searchLatestEpisode",
        params: show
      });
    },
    getShows() {
      this.$store.commit("webSocket/send", {
        object: "download",
        method: "getShows"
      });
    },
    run() {
      this.isLoading = true;
      this.$store.commit("webSocket/send", {
        object: "download",
        method: "run",
        params: { shows: this.shows.split(",") }
      });
    }
  }
};
</script>
