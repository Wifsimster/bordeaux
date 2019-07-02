<template>
  <div class="bg:black shadow:large relative">
    <ul class="list-reset">
      <router-link
        tag="li"
        to="/transmission"
        class="px:2 text:3/2 text:center hover:text:grey-dark cursor:pointer"
      >Transmission</router-link>
    </ul>
    <div v-if="open" class="text:green text:center px:1 absolute b:0 l:0 r:0">Socket opened</div>
    <div
      v-else
      class="text:red text:center px:1 absolute b:0 l:0 r:0 cursor:pointer"
      @click="connect()"
    >Socket closed</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ws: null,
      open: false
    };
  },
  created() {
    this.connect();
  },
  methods: {
    connect() {
      this.ws = new WebSocket("ws://localhost:8080");

      this.ws.onopen = evt => {
        this.open = true;
      };

      this.ws.onclose = evt => {
        this.open = false;
      };
    }
  }
};
</script>

