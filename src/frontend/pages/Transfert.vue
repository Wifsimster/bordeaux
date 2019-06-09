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
      <div class="text:3/2 text:bold mb:1">Transfert episodes from {{ from }} to {{ to }}</div>
      <btn @click="transfert()">Transfert</btn>
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

    this.ws.onopen = evt => {
      this.ws.onmessage = evt => {
        const data = JSON.parse(evt.data);
        if (data.error) {
          this.error = data.error;
        } else {
          this.message = data.results;
        }
      };
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
