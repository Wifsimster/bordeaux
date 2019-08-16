<template>
  <modal size="max-w:xl" :show="show" @close="$emit('close')">
    <template #content>
      <div class="relative w:full" v-if="detail" v-lazy-container="getLazyContainer()">
        <img class="min-h:full w:full align:middle rounded:t" :data-src="getImageSrc()" />
        <div class="absolute t:0 flex w:full justify:end">
          <div class="shadow bg:purple px:1/2 py:1/4 text:7/8 my:1/2" v-if="subtitle">Subtitle</div>
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

        <loader v-if="isLoading" :message="loadingMessage"></loader>

        <alert color="red" v-if="error">{{ error }}</alert>

        <alert color="green" v-if="addedMessage">{{ addedMessage }}</alert>

        <div class="m:1">
          <table class="border:collapse max-h:xs table:fixed" v-if="tpbList">
            <thead>
              <tr>
                <th>Name</th>
                <th>Quality</th>
                <th style="min-width: 100px">
                  <i class="arrow p:1/5 mr:1/4 border:white inline-block"></i>
                  <span class="inline-block">Seeder</span>
                </th>
                <th>Size</th>
                <th>Uploaded</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in tpbList"
                :key="item.name"
                @click="addTorentToTransmission(item.magnetLink)"
                :class="{ 'bg:orange':item.progress, 'hover:bg:grey-darker cursor:pointer':!item.progress }"
              >
                <td class="inline-block truncate p:1/4" style="max-width:450px">{{ item.name }}</td>
                <td class="w:full text:center p:1/4" style="min-width:50px">
                  <span v-if="item.quality">{{ item.quality }}</span>
                </td>
                <td class="w:full text:center p:1/4" style="min-width:50px">
                  <span v-if="item.seeder">{{ item.seeder }}</span>
                </td>
                <td class="w:full text:center p:1/4" style="min-width:125px">
                  <span v-if="item.size">{{ item.size }}</span>
                </td>
                <td class="w:full text:center p:1/4" style="min-width:100px">
                  <span v-if="item.uploaded">{{ item.uploaded }}</span>
                </td>
                <td>
                  <span v-if="item.progress">{{ item.progress }} %</span>
                </td>
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
      tpbList: [],
      isLoading: false,
      loadingMessage: null,
      addedMessage: null,
      removedMessage: null,
      subtitle: false
    };
  },
  watch: {
    show() {
      this.error = null;
      this.tpbList = null;
    },
    episode(val) {
      this.detail = null;
      if (val) {
        this.getEpisode();
        this.searchTorrents();
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
                if (data.error.code === 502) {
                  this.error = "The Pirate Bay is down !";
                } else {
                  this.error = data.error;
                }
              } else {
                this.tpbList = data.results.filter(item => item.seeder > 0);

                if (this.tpbList.length > 0) {
                  this.getActiveTorrents();
                }
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
                const torrents = data.results.torrents;

                this.tpbList.map((tracker, index) => {
                  torrents.map(torrent => {
                    if (tracker.magnetLink.startsWith(torrent.magnetLink)) {
                      this.$set(
                        this.tpbList,
                        index,
                        Object.assign(tracker, {
                          progress: parseInt(torrent.percentDone * 100)
                        })
                      );
                    }
                  });
                });
              }
              break;
          }
          break;
      }
    }
  },
  methods: {
    getTrackerPercentage() {},
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
      if (this.episode) {
        var season =
          this.episode.episode.season < 10
            ? `0${this.episode.episode.season}`
            : this.episode.episode.season;
        var number =
          this.episode.episode.number < 10
            ? `0${this.episode.episode.number}`
            : this.episode.episode.number;

        return `${this.episode.show.title} S${season}E${number}`;
      }
    },
    searchTorrents() {
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
    addTorentToTransmission(magnetLink) {
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
    removeTorrentToTransmission(id) {
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
    getActiveTorrents() {
      this.$store.commit("webSocket/send", {
        object: "transmission",
        method: "active"
      });
    },
    hasSubtitle(file) {
      this.$store.commit("webSocket/send", {
        object: "subtitle",
        method: "hasSubtitle",
        params: { file: file }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/global";

.arrow {
  border-width: 0 2px 2px 0;
  transform: rotate(-135deg);
}
</style>
