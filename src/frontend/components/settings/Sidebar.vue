<template>
  <div>
    <!-- Mobile device -->
    <div class="flex sm:none fixed b:0 l:0 r:0 overflow-x:auto bg:grey-darkest">
      <router-link
        to="/settings/directory"
        class="text:grey-light text:9/8 block px:1 py:1/2 hover:bg:grey-darkest"
        exact-active-class="text:orange bg:grey-darkest"
      >Directories</router-link
      >
      <router-link
        to="/settings/plex"
        class="text:grey-light text:9/8 block px:1 py:1/2 hover:bg:grey-darkest"
        exact-active-class="text:orange bg:grey-darkest"
      >Plex</router-link
      >
      <router-link
        to="/settings/server"
        class="text:grey-light text:9/8 block px:1 py:1/2 hover:bg:grey-darkest"
        exact-active-class="text:orange bg:grey-darkest"
      >Server</router-link
      >
      <router-link
        to="/settings/subtitles"
        class="text:grey-light text:9/8 block px:1 py:1/2 hover:bg:grey-darkest"
        exact-active-class="text:orange bg:grey-darkest"
      >Subtitles</router-link
      >
      <router-link
        to="/settings/trakt"
        class="text:grey-light text:9/8 block px:1 py:1/2 hover:bg:grey-darkest"
        exact-active-class="text:orange bg:grey-darkest"
      >Trakt</router-link
      >
      <router-link
        to="/settings/transmission"
        class="text:grey-light text:9/8 block px:1 py:1/2 hover:bg:grey-darkest"
        exact-active-class="text:orange bg:grey-darkest"
      >Transmission</router-link
      >
      <router-link
        to="/settings/update"
        class="text:grey-light text:9/8 block px:1 py:1/2 hover:bg:grey-darkest"
        exact-active-class="text:orange bg:grey-darkest"
      >Update</router-link
      >
    </div>

    <!-- Desktop device -->
    <div class="none sm:block border:r border:grey-darkest h:full">
      <router-link
        to="/settings/directory"
        class="text:grey-light text:9/8 block px:1 py:1/2 hover:bg:grey-darkest"
        exact-active-class="text:white border:l:1/4 border:orange bg:grey-darkest"
      >Directories</router-link
      >
      <router-link
        to="/settings/plex"
        class="text:grey-light text:9/8 block px:1 py:1/2 hover:bg:grey-darkest"
        exact-active-class="text:white border:l:1/4 border:orange bg:grey-darkest"
      >Plex</router-link
      >
      <router-link
        to="/settings/server"
        class="text:grey-light text:9/8 block px:1 py:1/2 hover:bg:grey-darkest"
        exact-active-class="text:white border:l:1/4 border:orange bg:grey-darkest"
      >Server</router-link
      >
      <router-link
        to="/settings/subtitles"
        class="text:grey-light text:9/8 block px:1 py:1/2 hover:bg:grey-darkest"
        exact-active-class="text:white border:l:1/4 border:orange bg:grey-darkest"
      >Subtitles</router-link
      >
      <router-link
        to="/settings/trakt"
        class="text:grey-light text:9/8 block px:1 py:1/2 hover:bg:grey-darkest"
        exact-active-class="text:white border:l:1/4 border:orange bg:grey-darkest"
      >Trakt</router-link
      >
      <router-link
        to="/settings/transmission"
        class="text:grey-light text:9/8 block px:1 py:1/2 hover:bg:grey-darkest"
        exact-active-class="text:white border:l:1/4 border:orange bg:grey-darkest"
      >Transmission</router-link
      >
      <router-link
        to="/settings/update"
        class="text:grey-light text:9/8 block px:1 py:1/2 hover:bg:grey-darkest"
        exact-active-class="text:white border:l:1/4 border:orange bg:grey-darkest"
      >Update</router-link
      >
    </div>
  </div>
</template>
