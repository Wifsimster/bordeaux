<template>
  <div class="bg:black text:white h:screen w:screen overflow:hidden">
    <div class="flex flex:col h:screen">
      <nav class="flex justify:between items:baseline flex:wrap w:screen">
        <logo></logo>
        <navigation></navigation>
      </nav>
      <main class="h:11/12 p:1 overflow-y:auto overflow-x:hidden">
        <notification></notification>
        <transition name="opacity" mode="out-in">
          <router-view></router-view>
        </transition>
      </main>
    </div>
  </div>
</template>

<script>
const Navigation = () => import("components/navigation.vue");
const Logo = () => import("components/logo.vue");
const Notification = () => import("components/notification.vue");

export default {
  components: {
    Navigation,
    Logo,
    Notification
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
        new WebSocket(`wss://${location.hostname}:444`)
      );
    }
  }
};
</script>

<style lang="scss">
@import "~scss/app";
</style>
