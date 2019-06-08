<template>
  <div class="app bg:grey-lighter text:white h:screen w:screen">
    <div class="flex flex:wrap h:full">
      <logo class="h:1/12 w:2/12"></logo>
      <navigation class="w:10/12"></navigation>
      <sidebar class="h:11/12 w:2/12"></sidebar>
      <transition name="opacity" mode="out-in">
        <router-view></router-view>
      </transition>
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
  }
};
</script>