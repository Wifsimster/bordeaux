<template>
  <div class="bg:black text:white h:screen w:screen overflow:hidden">
    <div class="flex flex:col h:screen">
      <nav class="flex flex:wrap w:screen">
        <logo></logo>
        <navigation></navigation>
      </nav>
      <main class="h:11/12 p:1 overflow-y:auto overflow-x:hidden">
        <transition name="opacity" mode="out-in">
          <router-view></router-view>
        </transition>
      </main>
    </div>
  </div>
</template>

<script>
const Navigation = () => import("components/Navigation.vue");
const Logo = () => import("components/Logo.vue");

import "beta-scss";

export default {
  components: {
    Navigation,
    Logo
  },
  data() {
    return {};
  },
  created() {
    this.connect();
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

<style lang="scss">
@import "../scss/global";
@import "node_modules/beta-scss/scss/global";

* {
  ::-webkit-scrollbar {
    width: 4px;
  }
  ::-webkit-scrollbar-track {
    background: map-get($colors, "grey-darkest");
  }
  ::-webkit-scrollbar-thumb {
    background: map-get($colors, "blue-dark");
  }
}
</style>
