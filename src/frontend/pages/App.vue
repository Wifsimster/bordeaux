<template>
  <div class="text:white h:screen w:screen overflow:hidden">
    <div class="flex flex:wrap h:screen">
      <logo class="h:1/12 w:2/12"></logo>
      <navigation class="h:1/12 w:10/12"></navigation>
      <sidebar class="h:11/12 w:2/12"></sidebar>
      <div class="w:10/12 bg:grey-lighter p:1 h:11/12 overflow-y:auto">
        <transition name="opacity" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
const Navigation = () => import("components/Navigation.vue");
const Logo = () => import("components/Logo.vue");
const Sidebar = () => import("components/Sidebar.vue");
import "beta-scss";
export default {
  components: {
    Navigation,
    Logo,
    Sidebar
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