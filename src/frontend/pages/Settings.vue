<template>
  <div class="flex flex:wrap">
    <server class="flex:1 min-w:xs max-w:sm py:1"></server>
    <directory class="flex:1 min-w:xs max-w:sm py:1"></directory>
    <transmission class="flex:1 min-w:xs max-w:sm py:1"></transmission>
    <plex class="flex:1 min-w:xs max-w:sm py:1"></plex>
    <trakt class="flex:1 min-w:xs max-w:sm py:1"></trakt>
  </div>
</template>

<script>
import Directory from "components/settings/directory.vue";
import Transmission from "components/settings/transmission.vue";
import Plex from "components/settings/plex.vue";
import Server from "components/settings/server.vue";
import Trakt from "components/settings/trakt.vue";
export default {
  components: {
    Directory,
    Transmission,
    Plex,
    Server,
    Trakt
  }
};
</script>

