<template>
  <card>
    <div class="p:1">
      <alert color="red" v-if="error">{{ error }}</alert>
      <alert v-if="message">
        <p>Fichiers ajoutés à Transmission :</p>
        <ul class="list-reset pl:1 px:1/2">
          <li v-for="item in message" :key="item.id">{{ item.name }}</li>
        </ul>
      </alert>
      <div class="text:3/2 text:bold mb:1">Searching for shows</div>
      <textarea class="block w:full border mb:1 text:1" style="min-height: 150px" v-model="shows"></textarea>
      <btn @click="run()">Searching</btn>
    </div>
  </card>
</template>

<script>
export default {
  data() {
    return {
      error: null,
      message: null,
      shows: null,
      ws: null
    };
  },
  created() {
    this.ws = new WebSocket("ws://localhost:8080/download");

    this.ws.onopen = evt => {
      this.getShows();

      this.ws.onmessage = evt => {
        const data = JSON.parse(evt.data);
        switch (data.method) {
          case "getShows":
            if (data.error) {
              this.error = data.error;
            } else {
              this.shows = data.results;
            }
            break;
          case "updateShows":
            if (data.error) {
              this.error = data.error;
            } else {
              this.shows = data.results;
            }
            break;
          case "run":
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
  watch: {
    shows(val) {
      this.updateShows(val);
    }
  },
  methods: {
    updateShows(data) {
      this.ws.send(
        JSON.stringify({
          method: "updateShows",
          params: data
        })
      );
    },
    getShows() {
      this.ws.send(
        JSON.stringify({
          method: "getShows"
        })
      );
    },
    run() {
      this.ws.send(
        JSON.stringify({
          method: "run",
          params: { shows: this.shows.split(",") }
        })
      );
    }
  }
};
</script>
