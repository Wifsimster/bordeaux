<template>
  <div class="p:1">
    <alert color="red" v-if="error">{{ error }}</alert>

    <alert v-if="results">
      <p>Fichiers ajoutés à Transmission :</p>
      <ul class="list-reset pl:1 px:1/2">
        <li v-for="item in message" :key="item.id">{{ item.name }}</li>
      </ul>
    </alert>

    <loader v-if="isLoading"></loader>

    <div class="flex justify:center">
      <div class="flex:1">
        <btn @click="previous()" size="sm">Previous</btn>
      </div>
      <div class="flex:1 text:center">
        <btn @click="today()" size="sm">Today</btn>
      </div>
      <div class="flex:1 text:right">
        <btn @click="next()" size="sm">Next</btn>
      </div>
    </div>

    <div class="mx:1" v-if="episodes && episodes.length > 0">
      <transition-group name="slide">
        <div class="w:full" v-for="day in days" :key="format(day)">
          <div class="text:orange p:1/4 bg:grey-darkest">{{ format(day) }}</div>
          <div class="responsive:6">
            <template v-if="getEpisodesFrom(day).length > 0">
              <div
                class="cursor:pointer"
                style="min-height: 75px"
                v-for="episode in getEpisodesFrom(day)"
                :key="episode.episode.ids.imdb"
                @click="open(episode)"
              >
                <img
                  v-if="episode.images"
                  v-lazy="getImageSrc(episode)"
                  class="min-h:full w:full align:middle"
                />
                <div class="absolute t:0 flex w:full justify:end">
                  <div
                    class="shadow bg:orange px:1/2 py:1/2 text:7/8 my:1/4"
                    v-if="hasBeenWatched(episode)"
                  ></div>
                  <div
                    class="shadow bg:green px:1/2 py:1/2 text:7/8 my:1/4"
                    v-if="hasBeenCollected(episode)"
                  ></div>
                </div>
                <div class="absolute b:3 l:1">{{ episode.show.title }}</div>
                <div
                  class="absolute b:1 l:1 text:bold truncate max-w:11/12"
                >{{ episode.episode.season }}x{{ episode.episode.number }} {{ episode.episode.title }}</div>
              </div>
            </template>
            <template v-else>Nothing this day</template>
          </div>
        </div>
      </transition-group>
    </div>

    <episode-detail :show="hasSelectedEpisode" :episode="selectedEpisode" @close="onClose"></episode-detail>
  </div>
</template>

<script>
import format from "date-fns/format";
import addDays from "date-fns/addDays";
import subDays from "date-fns/subDays";
import isSameDay from "date-fns/isSameDay";
import startOfWeek from "date-fns/startOfWeek";

import EpisodeDetail from "components/EpisodeDetail.vue";

export default {
  components: {
    EpisodeDetail
  },
  computed: {
    message() {
      return this.$store.getters["webSocket/message"];
    }
  },
  data() {
    return {
      error: null,
      results: null,
      settings: null,
      isLoading: false,
      episodes: null,
      currentDay: null,
      currentWeek: null,
      days: [],
      hasSelectedEpisode: false,
      selectedEpisode: null
    };
  },
  created() {
    this.getTransmissionSettings();

    this.currentDay = subDays(new Date(), 6);

    this.getWatched();
    this.getCollected();
  },
  watch: {
    currentDay() {
      this.days = [];

      for (var index = 0; index < 7; index++) {
        this.days.push(addDays(this.currentDay, index));
      }

      this.getEpisodes();
    },
    message(data) {
      if (data.object === "transmission") {
        switch (data.method) {
          case "getAll":
            if (data.error) {
              this.error = data.error;
            } else {
              this.settings = Object.assign({}, data.results);
            }
            break;
        }
      }

      if (data.object === "trakt") {
        switch (data.method) {
          case "getEpisodes":
            if (data.error) {
              this.error = data.error;
            } else {
              this.episodes = data.results;
            }
            break;
          case "getWatched":
            if (data.error) {
              this.error = data.error;
            } else {
              this.$store.set("trakt/watched", data.results);
            }
            break;
          case "getCollected":
            if (data.error) {
              this.error = data.error;
            } else {
              this.$store.set("trakt/collected", data.results);
            }
            break;
        }
      }
    }
  },
  methods: {
    onClose() {
      this.hasSelectedEpisode = false;
      this.selectedEpisode = null;
    },
    hasBeenWatched(episode) {
      if (episode) {
        var watched = this.$store.get("trakt/watched");

        if (watched) {
          var showWatch = watched.filter(
            watch => watch.show.ids.trakt === episode.show.ids.trakt
          )[0];

          if (showWatch) {
            var season = showWatch.seasons.filter(
              season => season.number === episode.episode.season
            )[0];

            if (season) {
              var number = season.episodes.filter(
                item => item.number === episode.episode.number
              )[0];

              if (number) {
                return true;
              }
            }
          }
        }

        return false;
      }
    },
    hasBeenCollected(episode) {
      if (episode) {
        var collected = this.$store.get("trakt/collected");

        if (collected) {
          var showWatch = collected.filter(
            watch => watch.show.ids.trakt === episode.show.ids.trakt
          )[0];

          if (showWatch) {
            var season = showWatch.seasons.filter(
              season => season.number === episode.episode.season
            )[0];

            if (season) {
              var number = season.episodes.filter(
                item => item.number === episode.episode.number
              )[0];

              if (number) {
                return true;
              }
            }
          }
        }

        return false;
      }
    },
    open(episode) {
      this.hasSelectedEpisode = true;
      this.selectedEpisode = episode;
    },
    previous() {
      this.currentDay = subDays(this.currentDay, 7);
    },
    today() {
      this.currentDay = subDays(new Date(), 6);
    },
    next() {
      this.currentDay = addDays(this.currentDay, 7);
    },
    getEpisodes() {
      this.$store.commit("webSocket/send", {
        object: "trakt",
        method: "getEpisodes",
        params: { startDate: format(this.currentDay, "yyyy-MM-dd"), days: "7" }
      });
    },
    getImageSrc(episode) {
      if (episode.images) {
        return {
          src: `https://image.tmdb.org/t/p/original${episode.images[0].file_path}`,
          loading: `https://trakt.tv/assets/placeholders/thumb/fanart-96d5b92c25602cd5f5f8bc3d7fe1a249.png`,
          error: `https://trakt.tv/assets/placeholders/thumb/fanart-96d5b92c25602cd5f5f8bc3d7fe1a249.png`
        };
      }
    },
    getEpisodesFrom(day) {
      if (this.episodes) {
        return this.episodes.filter(episode => {
          return isSameDay(new Date(episode.first_aired), day);
        });
      }
    },
    format(value) {
      return format(value, "dd / MM / yyyy");
    },
    getTransmissionSettings() {
      this.$store.commit("webSocket/send", {
        object: "transmission",
        method: "getAll"
      });
    },
    searchEpisode(episode) {
      this.$store.commit("webSocket/send", {
        object: "download",
        method: "searchLatestEpisode",
        params: { title: episode.show.title }
      });
    },
    addToTransmission(magnetLink, index) {
      this.shows[index].isLoading = true;

      this.$store.commit("webSocket/send", {
        object: "download",
        method: "addToTransmission",
        params: { magnetLink, settings: this.settings, show: this.shows[index] }
      });
    },
    getWatched() {
      this.$store.commit("webSocket/send", {
        object: "trakt",
        method: "getWatched"
      });
    },
    getCollected() {
      this.$store.commit("webSocket/send", {
        object: "trakt",
        method: "getCollected"
      });
    }
  }
};
</script>