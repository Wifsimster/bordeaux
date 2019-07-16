<template>
  <div class="bg:black text:white h:screen w:screen overflow:hidden">
    <div class="flex flex:col h:screen">
      <nav class="h:1/12 w:screen flex">
        <logo class="w:3/12"></logo>
        <navigation class="w:9/12"></navigation>
      </nav>
      <main class="h:11/12 p:1 overflow-y:auto">
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
@import "../../../node_modules/beta-scss/scss/global";

* {
  ::-webkit-scrollbar {
    width: 2px;
  }
  ::-webkit-scrollbar-track {
    background: map-get($colors, "grey-darkest");
  }
  ::-webkit-scrollbar-thumb {
    background: map-get($colors, "blue-dark");
  }
}
</style>
