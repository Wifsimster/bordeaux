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

    <transition name="opacity">
      <div class="calendar" v-if="episodes && episodes.length > 0">
        <div class="w:full" v-for="(day, index) in days" :key="index">
          <div class="text:orange p:1/4 bg:grey-darkest">{{ format(day) }}</div>
          <div class="flex flex:wrap">
            <div
              class="p:1/4 min-w:xs"
              v-for="episode in getEpisodesFrom(day)"
              :key="episode.episode.ids.imdb"
            >
              <div>{{ episode.show.title }}</div>
              <div>{{ episode.episode.season }}x{{ episode.episode.number }} {{ episode.episode.title }}</div>
              <div>
                <btn @click="searchEpisode(episode)" size="sm">Search</btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import format from "date-fns/format";
import addDays from "date-fns/addDays";
import isSameDay from "date-fns/isSameDay";
import startOfWeek from "date-fns/startOfWeek";

export default {
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
      currentDay: startOfWeek(new Date(), { weekStartsOn: 1 }),
      days: []
    };
  },
  created() {
    for (var index = 0; index < 7; index++) {
      this.days.push(addDays(this.currentDay, index));
    }

    this.getTransmissionSettings();

    this.getEpisodes();
  },
  watch: {
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
          default:
            console.log(`Unknow method : ${data.method}`);
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
        }
      }

      if (data.object === "download") {
        switch (data.method) {
          case "searchEpisode":
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
    getEpisodes() {
      this.$store.commit("webSocket/send", {
        object: "trakt",
        method: "getEpisodes",
        params: { startDate: "2019-07-29", days: "7" }
      });
    }
  }
};
</script>
