<template>
  <modal size="max-w:lg" :dismissible="true" @close="$emit('close')">
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
          <div class="flex justify:center w:full mx:1/2">
            <btn @click="search()">Search</btn>
          </div>
          <div>
            <table class="border:collapse overflow:auto max-h:xs" v-if="tpbList">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Quality</th>
                  <th>Seeder</th>
                  <th>Size</th>
                  <th>Uploaded</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in tpbList"
                  :key="item.name"
                  class="hover:bg:grey-darker cursor:pointer"
                  @click="addToTransmission(item.magnet)"
                >
                  <td>{{ item.name }}</td>
                  <td>{{ item.quality }}</td>
                  <td>{{ item.seeder }}</td>
                  <td>{{ item.size }}</td>
                  <td>{{ item.uploaded }}</td>
                </tr>
              </tbody>
            </table>
          </div>
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
      detail: null,
      tpbList: null
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
      if (data.object === "download") {
        switch (data.method) {
          case "searchEpisode":
            if (data.error) {
              this.error = data.error;
            } else {
              this.tpbList = data.results.filter(item => item.seeder > 0);
            }
            break;
          case "addToTransmission":
            if (data.error) {
              this.error = data.error;
            } else {
              console.log(data.results);
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
    },
    buildEpisodeName() {
      var season =
        this.episode.episode.season < 10
          ? `0${this.episode.episode.season}`
          : this.episode.episode.season;
      var number =
        this.episode.episode.number < 10
          ? `0${this.episode.episode.number}`
          : this.episode.episode.number;

      return `${this.episode.show.title} S${season}E${number}`;
    },
    search() {
      this.$store.commit("webSocket/send", {
        object: "download",
        method: "searchEpisode",
        params: {
          title: this.buildEpisodeName()
        }
      });
    },
    addToTransmission(magnetLink) {
      this.$store.commit("webSocket/send", {
        object: "download",
        method: "addToTransmission",
        params: {
          magnetLink: magnetLink
        }
      });
    }
  }
};
</script>