<template>
  <div class="relative flex items:center justify:center">
    <div class="text:2 text:bold mr:1">Bordeaux</div>
    <div v-if="isAlive" class="text:green">Opened</div>
    <div v-else class="text:red cursor:pointer" @click="connect()">Closed</div>
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