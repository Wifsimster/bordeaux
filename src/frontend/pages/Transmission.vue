<template>
  <card>
    <div class="p:1">
      <h1>Transmission settings</h1>
      <div v-if="data">
        <input v-model="data.host" placeholder="Host" />
        <input v-model="data.port" placeholder="Port" />
        <input v-model="data.username" placeholder="Username" />
        <input type="password" v-model="data.password" placeholder="Password" />
        <!-- <btn @click="update()">Update</btn> -->
        <btn @click="test()">Test</btn>
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
      firstLoad: true,
      isLoading: false
    };
  },
  watch: {
    "data.host"(newVal, oldVal) {
      if (oldVal) {
        this.update();
      }
    }
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
            console.log("Update return", data);
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
  methods: {
    getAll() {
      this.ws.send(
        JSON.stringify({
          method: "getAll"
        })
      );
    },
    update() {
      this.ws.send(
        JSON.stringify({
          method: "update",
          params: Object.assign({}, this.data)
        })
      );
    },
    test() {
      console.log("TODO");
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../../../node_modules/beta-scss/scss/global";

input {
  @extend .shadow;
  @extend .border;
  @extend .rounded;
  @extend .w\:full;
  @extend .text\:grey-darkest;
  @extend .placeholder\:grey;
  @extend .p\:1;
  @extend .mx\:1;
  @extend .block;
}
</style>
