<template>
  <div class="bg:white shadow:large">
    <div class="px:3/2">
      <router-link
        to="/download"
        class="no-underline text:grey-darkest text:3/2 py:1"
        active-class="text:purple"
      >Download</router-link>
      <router-link
        to="/transfert"
        class="no-underline text:grey-darkest text:3/2 py:1"
        active-class="text:purple"
      >Transfert</router-link>
      <router-link
        to="/subtitles"
        class="no-underline text:grey-darkest text:3/2 py:1"
        active-class="text:purple"
      >Subtitles</router-link>
      <router-link
        to="/shows"
        class="no-underline text:grey-darkest text:3/2 py:1"
        active-class="text:purple"
      >Shows</router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>