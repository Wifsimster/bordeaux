<template>
  <div class="bg:black shadow:large relative">
    <ul class="list-reset">
      <router-link
        tag="li"
        to="/transmission"
        class="px:2 text:3/2 text:center hover:text:grey-dark cursor:pointer"
      >Transmission</router-link>
    </ul>
    <div v-if="isAlive" class="text:green text:center px:1 absolute b:0 l:0 r:0">Connection opened</div>
    <div
      v-else
      class="text:red text:center px:1 absolute b:0 l:0 r:0 cursor:pointer"
      @click="connect()"
    >Connection closed</div>
  </div>
</template>

<script>
export default {
  computed: {
    isAlive() {
      return this.$store.getters["webSocket/isAlive"];
    }
  },
  methods: {
    connect() {
      this.$store.dispatch(
        "webSocket/ws",
        new WebSocket("ws://localhost:8080")
      );
    }
  }
};
</script>

