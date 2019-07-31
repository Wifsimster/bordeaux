<template>
  <modal size="max-w:md" :dismissible="true" @close="$emit('close')">
    <template #content>
      <div class="relative w:full">
        <img class="min-h:full w:full align:middle rounded:t" v-lazy="getImageSrc()" />
        <div class="absolute t:0 flex w:full justify:end">
          <div
            class="shadow bg:green px:1/2 py:1/4 text:7/8 my:1/2"
            v-if="hasBeenCollected(episode)"
          >Collected</div>
          <div
            class="shadow bg:orange px:1/2 py:1/4 text:7/8 my:1/2"
            v-if="hasBeenWatched()"
          >Watched</div>
          <div
            class="shadow bg:orange px:1/2 py:1/4 text:7/8 my:1/2"
            v-if="detail"
          >{{ detail.rating.toFixed(1) }}</div>
        </div>
        <div class="absolute b:1 l:1 r:1">
          <div>{{ episode.show.title }}: Season {{ episode.episode.season }}</div>
          <div class="truncate max-w:11/12">
            <span class="text:bold">{{ episode.episode.season }}x{{episode.episode.number}}</span>
            {{ episode.episode.title }}
          </div>
        </div>
      </div>
      <transition name="opacity">
        <div v-if="detail">
          <div class="flex">
            <div class="p:1">Aired : {{ getDate(detail.first_aired) }}</div>
            <div class="p:1">Runtime : {{ detail.runtime }}</div>
            <div class="p:1">Votes : {{ detail.votes }}</div>
          </div>
          <div class="p:1">{{ detail.overview }}</div>
          <btn @click="search()">Search</btn>
        </div>
      </transition>
    </template>
  </modal>
</template>

<script>
import parseISO from "date-fns/parseISO";
import format from "date-fns/format";

import Modal from "components/Modal.vue";

export default {
  components: { Modal },
  props: {
    episode: {
      type: Object
    }
  },
  computed: {
    message() {
      return this.$store.getters["webSocket/message"];
    }
  },
  data() {
    return {
      detail: null
    };
  },
  created() {
    this.getEpisode();
  },
  watch: {
    message(data) {
      if (data.object === "trakt") {
        switch (data.method) {
          case "getEpisode":
            if (data.error) {
              this.error = data.error;
            } else {
              this.detail = data.results;
            }
            break;
        }
      }
    }
  },
  methods: {
    hasBeenWatched() {
      var watched = this.$store.get("trakt/watched");

      var showWatch = watched.filter(
        watch => watch.show.ids.trakt === this.episode.show.ids.trakt
      )[0];

      return (
        showWatch &&
        showWatch.seasons[this.episode.episode.season - 1] &&
        showWatch.seasons[this.episode.episode.season - 1].episodes[
          this.episode.episode.number - 1
        ]
      );
    },
    hasBeenCollected() {
      var collected = this.$store.get("trakt/collected");

      var showCollected = collected.filter(
        item => item.show.ids.trakt === this.episode.show.ids.trakt
      )[0];

      return (
        showCollected &&
        showCollected.seasons[this.episode.episode.season - 1] &&
        showCollected.seasons[this.episode.episode.season - 1].episodes[
          this.episode.episode.number - 1
        ]
      );
    },
    getDate(value) {
      return format(parseISO(value), "yyyy-MM-dd");
    },
    getImageSrc() {
      if (this.episode.images) {
        return {
          src: `https://image.tmdb.org/t/p/original${this.episode.images[0].file_path}`,
          loading: `https://trakt.tv/assets/placeholders/thumb/fanart-96d5b92c25602cd5f5f8bc3d7fe1a249.png`,
          error: `https://trakt.tv/assets/placeholders/thumb/fanart-96d5b92c25602cd5f5f8bc3d7fe1a249.png`
        };
      }
    },
    getEpisode() {
      this.$store.commit("webSocket/send", {
        object: "trakt",
        method: "getEpisode",
        params: {
          showId: this.episode.show.ids.trakt,
          season: this.episode.episode.season,
          episode: this.episode.episode.number
        }
      });
    }
  }
};
</script>