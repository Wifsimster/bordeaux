<template>
  <div class="flex:3" v-if="!isWizard">
    <div class="flex flex:wrap items:center justify:center">
      <router-link
        to="/calendar"
        class="no-underline text:white text:3/2 py:1 px:1/2"
        active-class="border:b:1/4 border:orange"
      >Calendar</router-link>
      <router-link
        to="/transfert"
        class="no-underline text:white text:3/2 py:1 px:1/2"
        active-class="border:b:1/4 border:orange"
      >Transfert</router-link>
      <router-link
        to="/subtitles"
        class="no-underline text:white text:3/2 py:1 px:1/2"
        active-class="border:b:1/4 border:orange"
      >Subtitles</router-link>
      <router-link
        to="/settings"
        class="no-underline text:white text:3/2 py:1 px:1/2"
        active-class="border:b:1/4 border:orange"
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
  }
};
</script>