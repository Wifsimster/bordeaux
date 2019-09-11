<template>
  <div class="flex flex:wrap">
    <server class="w:full sm:flex:6/12 md:flex:4/12 xl:flex:3/12 py:1" />
    <directory class="w:full sm:flex:6/12 md:flex:4/12 xl:flex:3/12 py:1" />
    <transmission class="w:full sm:flex:6/12 md:flex:4/12 xl:flex:3/12 py:1" />
    <plex class="w:full sm:flex:6/12 md:flex:4/12 xl:flex:3/12 py:1" />
    <trakt class="w:full sm:flex:6/12 md:flex:4/12 xl:flex:3/12 py:1" />
    <subtitles class="w:full sm:flex:6/12 md:flex:4/12 xl:flex:3/12 py:1" />
  </div>
</template>

<script>
import Directory from "components/settings/directory.vue";
import Transmission from "components/settings/transmission.vue";
import Plex from "components/settings/plex.vue";
import Server from "components/settings/server.vue";
import Trakt from "components/settings/trakt.vue";
import Subtitles from "components/settings/subtitles.vue";
export default {
  components: {
    Directory,
    Transmission,
    Plex,
    Server,
    Trakt,
    Subtitles
  }
};
</script>

