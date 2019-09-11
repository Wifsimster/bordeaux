<template>
  <div class="bg:black text:white h:screen w:screen overflow:hidden">
    <transition name="opacity">
      <div
        class="fixed b:0 l:0 r:0 bg:grey-darkest flex justify:center px:1 shadow:large z:10"
        v-if="isPWAPromptTrigger"
      >
        <div class="absolute t:1 r:1 p:1/4 cursor:pointer" @click="isPWAPromptTrigger = false">x</div>
        <btn @click="addToHomeScreen">Add to home screen</btn>
      </div>
    </transition>
    <div class="flex flex:col h:screen">
      <nav class="flex justify:between items:baseline flex:wrap w:screen">
        <logo></logo>
        <navigation></navigation>
      </nav>
      <main class="h:11/12 overflow-y:auto overflow-x:hidden">
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
    return {
      isPWAPromptTrigger: false
    };
  },
  created() {
    this.connect();
    this.isPWA();
  },
  methods: {
    // Detect installation prompt for PWA
    isPWA() {
      window.addEventListener("beforeinstallprompt", e => {
        e.preventDefault();
        this.isPWAPromptTrigger = e;
      });
    },
    addToHomeScreen() {
      this.isPWAPromptTrigger.userChoice.then(e);
    },
    connect() {
      this.$store.dispatch(
        "webSocket/ws",
        new WebSocket(`ws://${location.hostname}:8080`)
      );
    }
  }
};
</script>

<style lang="scss">
@import "~scss/app";
</style>
