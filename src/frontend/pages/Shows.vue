<template>
  <card>
    <div class="p:1">
      <div class="text:3/2 text:bold mb:1">Manage your shows</div>
      <alert color="red" v-if="error">{{ error }}</alert>
      <loader v-if="isLoading"></loader>
      <div>
        <input
          v-model="query"
          placeholder="Search a new show"
          class="inline-block w:2/4 border mb:1 text:1 py:1/2"
          style="height: 46px;"
          @keyup.enter="search()"
        >
        <btn v-if="!isLoading" class="inline-block w:1/4" @click="search()">Searching</btn>
        <span v-if="results" @click="results = null" class="cursor:pointer p:1">Cancel</span>

        <!-- Search results -->
        <div v-if="results && results.length > 0" class="flex flex:wrap mt:1">
          <div v-for="(show, index) in results" :key="index" class="w:1/2" @click="add(show)">
            <div
              class="flex bg:grey-lightest border hover:bg:blue-lightest cursor:pointer rounded m:1/4"
              style="max-height: 165px"
            >
              <div class="w:1/4 pr:1/2 overflow:hidden">
                <img v-if="show.images.poster" class="w:full rounded:l" :src="show.images.poster">
                <div v-else class="w:full h:full bg:grey-light pr:1/2"></div>
              </div>
              <div class="w:3/4">
                <div class="mt:1/2">
                  <a
                    :href="`https://www.imdb.com/title/${show.imdb_id}`"
                    targetAll="_blank"
                  >{{ show.title }}</a>
                  ({{ show.creation }})
                  <span
                    v-if="show.status === 'Ended'"
                    class="inline-block text:7/8 bg:red-light text:white text:center rounded py:1/2 px:1/4 mx:1/4"
                  >{{ show.status }}</span>
                  <span
                    v-if="show.status === 'Continuing'"
                    class="inline-block text:7/8 bg:green-light text:white text:center rounded py:1/2 px:1/4 mx:1/4"
                  >{{ show.status }}</span>
                </div>
                <span
                  v-for="genre in show.genres"
                  :key="genre"
                  class="inline-block text:7/8 bg:grey-light text:grey-darker rounded py:1/2 px:1/4 mr:1/2 mx:1/4"
                >{{ genre }}</span>
                <div>
                  <span
                    v-if="show.language"
                    class="inline-block text:7/8 bg:grey-light text:grey-darker rounded py:1/2 px:1/4 mr:1/2 mx:1/4"
                  >{{ show.language }}</span>
                  <span
                    v-if="show.network"
                    class="inline-block text:7/8 bg:grey-light text:grey-darker rounded py:1/2 px:1/4 mr:1/2 mx:1/4"
                  >{{ show.network }}</span>
                  <span
                    v-if="show.rating"
                    class="inline-block text:7/8 bg:grey-light text:grey-darker rounded py:1/2 px:1/4 mr:1/2 mx:1/4"
                  >{{ show.rating }}</span>
                  <span
                    v-if="show.length"
                    class="inline-block text:7/8 bg:grey-light text:grey-darker rounded py:1/2 px:1/4 mr:1/2 mx:1/4"
                  >{{ show.length }} min</span>
                </div>
                <div>
                  <span
                    v-if="show.notes"
                    :title="show.notes.total + ' votes'"
                    class="inline-block text:7/8 bg:grey-light text:grey-darker rounded py:1/2 px:1/4 mr:1/2 mx:1/4"
                  >{{ show.notes.mean.toFixed(1) }}/5</span>
                  <span
                    v-if="show.seasons"
                    class="inline-block text:7/8 bg:grey-light text:grey-darker rounded py:1/2 px:1/4 mr:1/2 mx:1/4"
                  >Seasons {{ show.seasons }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="results && results.length === 0" class="text:center">No result found :(</div>
      </div>

      <!-- Shows -->
      <div v-if="!results && shows && shows.length > 0" class="flex flex:wrap mt:1">
        <div v-for="(show, index) in shows" :key="index" class="w:1/2" @click="remove(show)">
          <div
            class="flex bg:grey-lightest border hover:bg:blue-lightest cursor:pointer rounded m:1/4"
            style="max-height: 165px"
          >
            <div class="w:3/12 pr:1/2 overflow:hidden">
              <img v-if="show.images.poster" class="w:full rounded:l" :src="show.images.poster">
              <div v-else class="w:full h:full bg:grey-light pr:1/2"></div>
            </div>
            <div class="w:7/12 relative">
              <div class="mt:1/2">
                <a
                  :href="`https://www.imdb.com/title/${show.imdb_id}`"
                  targetAll="_blank"
                >{{ show.title }}</a>
                ({{ show.creation }})
                <span
                  v-if="show.status === 'Ended'"
                  class="inline-block text:7/8 bg:red-light text:white text:center rounded py:1/2 px:1/4 mx:1/4"
                >{{ show.status }}</span>
                <span
                  v-if="show.status === 'Continuing'"
                  class="inline-block text:7/8 bg:green-light text:white text:center rounded py:1/2 px:1/4 mx:1/4"
                >{{ show.status }}</span>
              </div>
              <span
                v-for="genre in show.genres"
                :key="genre"
                class="inline-block text:7/8 bg:grey-light text:grey-darker rounded py:1/2 px:1/4 mr:1/2 mx:1/4"
              >{{ genre }}</span>
              <div>
                <span
                  v-if="show.language"
                  class="inline-block text:7/8 bg:grey-light text:grey-darker rounded py:1/2 px:1/4 mr:1/2 mx:1/4"
                >{{ show.language }}</span>
                <span
                  v-if="show.network"
                  class="inline-block text:7/8 bg:grey-light text:grey-darker rounded py:1/2 px:1/4 mr:1/2 mx:1/4"
                >{{ show.network }}</span>
                <span
                  v-if="show.rating"
                  class="inline-block text:7/8 bg:grey-light text:grey-darker rounded py:1/2 px:1/4 mr:1/2 mx:1/4"
                >{{ show.rating }}</span>
                <span
                  v-if="show.length"
                  class="inline-block text:7/8 bg:grey-light text:grey-darker rounded py:1/2 px:1/4 mr:1/2 mx:1/4"
                >{{ show.length }} min</span>
              </div>
              <div>
                <span
                  v-if="show.notes"
                  :title="show.notes.total + ' votes'"
                  class="inline-block text:7/8 bg:grey-light text:grey-darker rounded py:1/2 px:1/4 mr:1/2 mx:1/4"
                >{{ show.notes.mean.toFixed(1) }}/5</span>
                <span
                  v-if="show.seasons"
                  class="inline-block text:7/8 bg:grey-light text:grey-darker rounded py:1/2 px:1/4 mr:1/2 mx:1/4"
                >Seasons {{ show.seasons }}</span>
              </div>
            </div>
            <div class="self:center w:2/12 h:full">
              <span @click="remove(show)">Supprimer</span>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!results && shows && shows.length === 0" class="text:center">No show added :(</div>
    </div>
  </card>
</template>

<script>
export default {
  data() {
    return {
      error: null,
      shows: null,
      ws: null,
      results: null,
      query: null,
      isLoading: false
    };
  },
  created() {
    this.ws = new WebSocket("ws://localhost:8080/show");

    this.ws.onopen = evt => {
      this.getAll();

      this.ws.onmessage = evt => {
        const data = JSON.parse(evt.data);
        switch (data.method) {
          case "search":
            if (data.error) {
              this.error = data.error;
            } else {
              this.results = data.results;
            }
            break;
          case "getAll":
            if (data.error) {
              this.error = data.error;
            } else {
              this.shows = data.results;
            }
            break;
          case "add":
            if (data.error) {
              this.error = data.error;
            } else {
              this.query = null;
              this.results = null;
              this.getAll();
            }
            break;
          case "remove":
            if (data.error) {
              this.error = data.error;
            } else {
              this.shows = data.results;
            }
            break;
          default:
            console.log(`Unknow method : ${data.method}`);
        }
      };
    };
  },
  methods: {
    search() {
      this.ws.send(
        JSON.stringify({
          method: "search",
          params: { query: this.query }
        })
      );
    },
    getAll() {
      this.ws.send(
        JSON.stringify({
          method: "getAll"
        })
      );
    },
    add(show) {
      this.ws.send(
        JSON.stringify({
          method: "add",
          params: Object.assign({}, show)
        })
      );
    },
    remove(show) {
      this.ws.send(
        JSON.stringify({
          method: "remove",
          params: Object.assign({}, show)
        })
      );
    }
  }
};
</script>
