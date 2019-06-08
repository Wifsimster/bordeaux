<template>
  <card>
    <div class="flex">
      <div class="w:1/3 bg:grey text:center">Image</div>
      <div class="w:2/3 p:1">
        <alert color="red" v-if="error">{{ error }}</alert>
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
      from: "/",
      to: "/",
      ws: null
    };
  },
  created() {
    this.ws = new WebSocket("ws://localhost:8080");

    this.ws.onmessage = data => {
      console.log(data);
    };

    this.ws.onopen = evt => {
      console.log(evt);
    };

    this.ws.onclose = evt => {
      console.log(evt);
    };
  },
  methods: {
    transfert() {
      this.ws.send(JSON.stringify({ method: "transfert", params: [] }));
    }
  }
};
</script>
