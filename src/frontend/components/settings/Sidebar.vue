<template>
  <div class="border:r border:white">
    <router-link
      to="/settings/directory"
      class="text:white text:9/8 block py:1 px:1/2 hover:bg:grey-darkest"
      exact-active-class="text:orange"
    >Directories</router-link>
    <router-link
      to="/settings/plex"
      class="text:white text:9/8 block py:1 px:1/2 hover:bg:grey-darkest"
      exact-active-class="text:orange"
    >Plex</router-link>
    <router-link
      to="/settings/server"
      class="text:white text:9/8 block py:1 px:1/2 hover:bg:grey-darkest"
      exact-active-class="text:orange"
    >Server</router-link>
    <router-link
      to="/settings/subtitles"
      class="text:white text:9/8 block py:1 px:1/2 hover:bg:grey-darkest"
      exact-active-class="text:orange"
    >Subtitles</router-link>
    <router-link
      to="/settings/trakt"
      class="text:white text:9/8 block py:1 px:1/2 hover:bg:grey-darkest"
      exact-active-class="text:orange"
    >Trakt</router-link>
    <router-link
      to="/settings/transmission"
      class="text:white text:9/8 block py:1 px:1/2 hover:bg:grey-darkest"
      exact-active-class="text:orange"
    >Transmission</router-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>