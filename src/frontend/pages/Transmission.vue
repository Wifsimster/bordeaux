<template>
  <card>
    <div class="p:1">
      <h1>Transmission settings</h1>
      <div v-if="data">
        <input v-model="data.host">
        <input v-model="data.port">
        <input v-model="data.username">
        <input type="password" v-model="data.password">
      </div>
    </div>
  </card>
</template>

<script>
export default {
  data() {
    return {
      error: null,
      message: null,
      data: null,
      ws: null,
      isLoading: false
    };
  },
  created() {
    this.ws = new WebSocket("ws://localhost:8080/transmission");

    this.ws.onopen = evt => {
      this.getAll();

      this.ws.onmessage = evt => {
        const data = JSON.parse(evt.data);
        switch (data.method) {
          case "getAll":
            if (data.error) {
              this.error = data.error;
            } else {
              this.data = data.results;
            }
            break;
          case "update":
            if (data.error) {
              this.error = data.error;
            } else {
              this.data = data.results;
            }
            break;
          default:
            console.log(`Unknow method : ${data.method}`);
        }
      };
    };
  },
  watch: {
    data(val) {
      this.update(val);
    }
  },
  methods: {
    getAll() {
      this.ws.send(
        JSON.stringify({
          method: "getAll"
        })
      );
    },
    update(data) {
      this.ws.send(
        JSON.stringify({
          method: "update",
          params: Object.assign({}, data)
        })
      );
    }
  }
};
</script>
