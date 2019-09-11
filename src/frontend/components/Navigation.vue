<template>
  <div v-if="!isWizard" class="flex:1">
    <div
      class="kebab flex justify:end p:1 md:none text:white text:3/2 relative cursor:pointer"
      @click="displayKebab = true"
    ></div>

    <!--  Mobile desktop -->
    <div
      class="absolute t:0 r:0 flex flex:col w:0 h:0 z:10 bg:black transition overflow:hidden"
      :class="{ 'w:full h:full': displayKebab }"
    >
      <div
        class="absolute t:0 r:0 text:3/2 cursor:pointer p:1"
        v-if="displayKebab"
        @click="displayKebab = false"
      >x</div>
      <router-link
        to="/calendar"
        class="text:white text:3/2 p:1"
        exact-active-class="text:orange md:border:b:1/4 border:orange"
      >Calendar</router-link>
      <router-link
        to="/transfert"
        class="text:white text:3/2 p:1"
        exact-active-class="text:orange md:border:b:1/4 border:orange"
      >Transfert</router-link>
      <router-link
        to="/subtitles"
        class="text:white text:3/2 p:1"
        exact-active-class="text:orange md:border:b:1/4 border:orange"
      >Subtitles</router-link>
      <router-link
        to="/settings"
        class="text:white text:3/2 p:1"
        exact-active-class="text:orange md:border:b:1/4 border:orange"
      >Settings</router-link>
    </div>

    <!-- Desktop menu -->
    <div class="none md:flex flex:wrap items:center justify:center">
      <router-link
        to="/calendar"
        class="text:white text:3/2 py:1"
        exact-active-class="border:b:1/4 border:orange"
      >Calendar</router-link>
      <router-link
        to="/transfert"
        class="text:white text:3/2 py:1"
        exact-active-class="border:b:1/4 border:orange"
      >Transfert</router-link>
      <router-link
        to="/subtitles"
        class="text:white text:3/2 py:1"
        exact-active-class="border:b:1/4 border:orange"
      >Subtitles</router-link>
      <router-link
        to="/settings"
        class="text:white text:3/2 py:1"
        exact-active-class="border:b:1/4 border:orange"
      >Settings</router-link>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isWizard() {
      return this.$route.path === `/wizard`;
    }
  },
  data() {
    return {
      displayKebab: false
    };
  },
  watch: {
    $route() {
      this.displayKebab = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.kebab:after {
  content: "\2807";
}
</style>