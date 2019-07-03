<template>
  <card>
    <div class="p:1">
      <div class="text:3/2 text:bold mb:1">Latest episodes available</div>
      <alert color="red" v-if="error">{{ error }}</alert>
      <alert v-if="message">
        <p>Fichiers ajoutés à Transmission :</p>
        <ul class="list-reset pl:1 px:1/2">
          <li v-for="item in message" :key="item.id">{{ item.name }}</li>
        </ul>
      </alert>
      <loader v-if="isLoading"></loader>
      <div>
        Shows :
        <div v-for="show in shows" :key="show.id" class="mx:1">
          {{ show.title }}
          <span
            v-if="!show.magnetLink"
            class="border rounded bg:grey-light text:grey-darker px:1/4 py:1/2 cursor:pointer"
            @click="searchLatestEpisode(show)"
          >Search latest episode</span>
          <span
            v-if="show.magnetLink"
            class="border rounded bg:grey-light text:grey-darker px:1/4 py:1/2 cursor:pointer"
            @click="addToTransmission(show.magnetLink)"
          >Ajouter à Transmission</span>
        </div>
      </div>
    </div>
  </card>
</template>

<script>
export default {
  computed: {
    ws() {
      return this.$store.getters["webSocket/ws"];
    }
  },
  data() {
    return {
      error: null,
      message: null,
      shows: null,
      isLoading: false
    };
  },
  created() {
    this.getShows();

    this.ws.onmessage = evt => {
      const data = JSON.parse(evt.data);
      if (data.object === "download") {
        switch (data.method) {
          case "addToTransmission":
            this.isLoading = false;
            if (data.error) {
              this.error = data.error;
            } else {
              this.shows = this.shows.map((show, index) => {
                if (show.id === data.params.id) {
                  show.magnetLink = null;
                }
                return show;
              });
            }
            break;
          case "searchLatestEpisode":
            this.isLoading = false;
            if (data.error) {
              this.error = data.error;
            } else {
              this.shows = this.shows.map((show, index) => {
                if (show.id === data.params.id) {
                  show.magnetLink = data.results;
                }
                return show;
              });
            }
            break;
          case "getShows":
            if (data.error) {
              this.error = data.error;
            } else {
              this.shows = data.results;
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
      }
    };
  },
  methods: {
    addToTransmission(magnetLink) {
      this.ws.send(
        JSON.stringify({
          object: "download",
          method: "addToTransmission",
          params: magnetLink
        })
      );
    },
    searchLatestEpisode(show) {
      this.ws.send(
        JSON.stringify({
          object: "download",
          method: "searchLatestEpisode",
          params: show
        })
      );
    },
    getShows() {
      this.ws.send(
        JSON.stringify({
          object: "download",
          method: "getShows"
        })
      );
    },
    run() {
      this.isLoading = true;
      this.ws.send(
        JSON.stringify({
          object: "download",
          method: "run",
          params: { shows: this.shows.split(",") }
        })
      );
    }
  }
};
</script>
