<template>
  <card>
    <div class="flex">
      <div class="w:1/3 bg:grey text:center">Image</div>
      <div class="w:2/3 p:1">
        <alert color="red" v-if="error">{{ error }}</alert>
        <alert v-if="message">{{ message }}</alert>
        <div class="text:3/2 text:bold mb:1">Transfert episodes from {{ from }} to {{ to }}</div>
        <btn @click="transfert()">Transfert</btn>
      </div>
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
      message: null
    };
  },
  created() {
    this.ws = new WebSocket("ws://localhost:8080/transfert");

    this.ws.onmessage = evt => {
      const data = JSON.parse(evt.data);
      if (data.error) {
        this.error = data.error;
      } else {
        this.message = data.results;
      }
    };

    this.ws.onopen = evt => {
      console.log(`Open : ${evt}`);
    };

    this.ws.onclose = evt => {
      console.log(`Close : ${evt}`);
    };
  },
  methods: {
    transfert() {
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
