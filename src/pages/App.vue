
<template>
  <div class="app bg:black text:white h:screen w:screen">
    <div class="flex">
      <div class="flex:full">
        <navigation></navigation>
      </div>
      <div class="flex:1">
        <transition name="opacity" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from "../components/Navigation.vue";
import "beta-scss";
export default {
  components: {
    navigation: Navigation
  }
};
</script>