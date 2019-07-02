<template>
  <div class="bg:white shadow:large">
    <div class="py:1/2 px:3/2">
      <router-link
        to="/shows"
        class="no-underline text:grey-darkest text:3/2 py:1 px:1/2"
        active-class="border:b:1/4 border:purple-light"
      >Shows</router-link>
      <router-link
        to="/download"
        class="no-underline text:grey-darkest text:3/2 py:1 px:1/2"
        active-class="border:b:1/4 border:purple-light"
      >Download</router-link>
      <router-link
        to="/transfert"
        class="no-underline text:grey-darkest text:3/2 py:1 px:1/2"
        active-class="border:b:1/4 border:purple-light"
      >Transfert</router-link>
      <router-link
        to="/subtitles"
        class="no-underline text:grey-darkest text:3/2 py:1 px:1/2"
        active-class="border:b:1/4 border:purple-light"
      >Subtitles</router-link>
    </div>
  </div>
</template>