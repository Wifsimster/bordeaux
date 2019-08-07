<template>
  <modal size="max-w:xl" :show="show" @close="$emit('close')">
    <template #content>
      <div class="relative w:full" v-if="detail" v-lazy-container="getLazyContainer()">
        <img class="min-h:full w:full align:middle rounded:t" :data-src="getImageSrc()" />
        <div class="absolute t:0 flex w:full justify:end">
          <div
            class="shadow bg:green px:1/2 py:1/4 text:7/8 my:1/2"
            v-if="hasBeenCollected(episode)"
          >Collected</div>
          <div
            class="shadow bg:orange px:1/2 py:1/4 text:7/8 my:1/2"
            v-if="hasBeenWatched()"
          >Watched</div>
          <div class="shadow bg:orange px:1/2 py:1/4 text:7/8 my:1/2">{{ detail.rating.toFixed(1) }}</div>
        </div>
        <div class="absolute b:1 l:1 r:1">
          <div>{{ episode.show.title }}: Season {{ episode.episode.season }}</div>
          <div class="truncate max-w:11/12">
            <span class="text:bold">{{ episode.episode.season }}x{{episode.episode.number}}</span>
            {{ episode.episode.title }}
          </div>
        </div>
      </div>
      <div v-if="detail">
        <div class="flex">
          <div class="p:1">Aired : {{ getDate(detail.first_aired) }}</div>
          <div class="p:1">Runtime : {{ detail.runtime }}</div>
          <div class="p:1">Votes : {{ detail.votes }}</div>
        </div>
        <div class="p:1">{{ detail.overview }}</div>

        <div class="flex justify:center w:full mx:1/2" v-if="!isLoading">
          <btn @click="search()">Search</btn>
        </div>

        <loader v-if="isLoading" :message="loadingMessage"></loader>

        <alert color="red" v-if="error">{{ error }}</alert>

        <alert color="green" v-if="addedMessage">{{ addedMessage }}</alert>

        <div>
          <table class="border:collapse max-h:xs mx:1 table:fixed w:full" v-if="tpbList">
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
                <td class="inline-block truncate" style="width:225px">{{ item.name }}</td>
                <td class="text:center">{{ item.quality }}</td>
                <td class="text:center">{{ item.seeder }}</td>
                <td class="text:center">{{ item.size }}</td>
                <td class="text:center">{{ item.uploaded }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
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
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    message() {
      return this.$store.getters["webSocket/message"];
    }
  },
  data() {
    return {
      error: null,
      detail: null,
      tpbList: null,
      isLoading: false,
      loadingMessage: null,
      addedMessage: null,
      removedMessage: null
    };
  },
  watch: {
    show() {
      this.tpbList = null;
    },
    episode(val) {
      this.detail = null;
      if (val) {
        this.getEpisode();
        this.getTorrents();
        this.addedMessage = null;
      }
    },
    message(data) {
      switch (data.object) {
        case "trakt":
          switch (data.method) {
            case "getEpisode":
              if (data.error) {
                this.error = data.error;
              } else {
                this.detail = data.results;
              }
              break;
          }
          break;

        case "download":
          switch (data.method) {
            case "searchEpisode":
              this.isLoading = false;
              if (data.error) {
                this.error = data.error;
              } else {
                this.tpbList = data.results.filter(item => item.seeder > 0);
              }
              break;
          }
          break;

        case "transmission":
          switch (data.method) {
            case "add":
              this.isLoading = false;
              if (data.error) {
                this.error = data.error;
              } else {
                this.addedMessage = `${data.results.name} added to Transmission ;)`;
                this.tpbList = null;
              }
              break;
            case "remove":
              this.isLoading = false;
              if (data.error) {
                this.error = data.error;
              } else {
                this.removedMessage = `${data.results.name} remove to Transmission ;)`;
                this.tpbList = null;
              }
              break;
            case "active":
              if (data.error) {
                this.error = data.error;
              } else {
                console.log(`TODO : ${data.results}`);
              }
              break;
          }
          break;
      }
    }
  },
  methods: {
    hasBeenWatched() {
      var watched = this.$store.get("trakt/watched");

      if (watched) {
        var showWatch = watched.filter(
          watch => watch.show.ids.trakt === this.episode.show.ids.trakt
        )[0];

        if (showWatch) {
          var season = showWatch.seasons.filter(
            season => season.number === this.episode.episode.season
          )[0];

          if (season) {
            var number = season.episodes.filter(
              episode => episode.number === this.episode.episode.number
            )[0];

            if (number) {
              return true;
            }
          }
        }
      }

      return false;
    },
    hasBeenCollected() {
      var collected = this.$store.get("trakt/collected");

      if (collected) {
        var showWatch = collected.filter(
          watch => watch.show.ids.trakt === this.episode.show.ids.trakt
        )[0];

        if (showWatch) {
          var season = showWatch.seasons.filter(
            season => season.number === this.episode.episode.season
          )[0];

          if (season) {
            var number = season.episodes.filter(
              episode => episode.number === this.episode.episode.number
            )[0];

            if (number) {
              return true;
            }
          }
        }
      }

      return false;
    },
    getDate(value) {
      return format(parseISO(value), "yyyy-MM-dd");
    },
    getLazyContainer() {
      if (this.episode.images) {
        return {
          selector: "img",
          loading: `https://trakt.tv/assets/placeholders/thumb/fanart-96d5b92c25602cd5f5f8bc3d7fe1a249.png`,
          error: `https://trakt.tv/assets/placeholders/thumb/fanart-96d5b92c25602cd5f5f8bc3d7fe1a249.png`
        };
      }
    },
    getImageSrc() {
      if (this.episode.images) {
        return `https://image.tmdb.org/t/p/original${this.episode.images[0].file_path}`;
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
      this.isLoading = true;
      this.loadingMessage = "Searchig trackers...";
      this.addedMessage = null;
      this.$store.commit("webSocket/send", {
        object: "download",
        method: "searchEpisode",
        params: {
          title: this.buildEpisodeName()
        }
      });
    },
    addToTransmission(magnetLink) {
      this.isLoading = true;
      this.loadingMessage = "Adding to Transmission...";
      this.$store.commit("webSocket/send", {
        object: "transmission",
        method: "add",
        params: {
          magnetLink: magnetLink
        }
      });
    },
    removeToTransmission(id) {
      this.isLoading = true;
      this.loadingMessage = "Removing to Transmission...";
      this.$store.commit("webSocket/send", {
        object: "transmission",
        method: "remove",
        params: {
          id: id
        }
      });
    },
    getTorrents() {
      this.$store.commit("webSocket/send", {
        object: "transmission",
        method: "active"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/global";
</style>
