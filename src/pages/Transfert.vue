<template>
  <div class="p:1">
    <alert color="red" v-if="error">{{ error }}</alert>

    <loader v-if="isLoading" :message="loadingMessage"></loader>

    <div v-if="!isLoading">
      <alert v-if="success" color="green">
        <p>Files transfert with success :)</p>
      </alert>

      <!-- Mobile -->
      <div v-if="hasEpisodes" class="sm:none flex:col">
        <div
          v-for="episode in episodes"
          :key="episode.directory"
          class="flex flex:wrap justify:between"
        >
          <div>{{ episode.destination.filename }}</div>
          <div>
            <loader v-if="episode.loading"></loader>
            <span v-if="episode.transfered" class="text:green">Done</span>
          </div>
        </div>
      </div>

      <!-- Desktop -->
      <div v-if="hasEpisodes" class="none sm:block">
        <table class="border:collapse w:full">
          <thead>
            <tr>
              <th>Episode found</th>
              <th>Episode destination</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="episode in episodes" :key="episode.directory" class="hover:bg:grey-darker">
              <td>{{ episode.origin.file }}</td>
              <td>{{ episode.destination.path }}</td>
              <td class="text:center">
                <loader v-if="episode.loading"></loader>
                <span v-if="episode.transfered" class="text:green">Done</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="text:center">No espiode found :(</div>
    </div>

    <div class="flex w:full justify:center mt:1" v-if="!isLoading">
      <btn class="mr:1" @click="search()">Scan</btn>
      <btn v-if="hasEpisodes" @click="transfert()">Transfert</btn>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */

export default {
  name: 'Transfert',
  computed: {
    hasEpisodes() {
      return this.episodes && this.episodes.length > 0
    },
    hasNoEpisode() {
      return this.episodes && this.episodes.length === 0
    },
    message() {
      return this.$store.getters['webSocket/message']
    }
  },
  data() {
    return {
      error: null,
      episodes: null,
      success: null,
      isLoading: false,
      loadingMessage: null,
      subtitlesSettings: null
    }
  },
  created() {
    this.getSubtitlesSettings()
    this.search()
  },
  watch: {
    message(data) {
      switch (data.object) {
      case 'transfert':
        switch (data.method) {
        case 'search':
          this.isLoading = false
          if (data.error) {
            this.error = data.error
          } else {
            this.episodes = Object.assign([], data.results)
          }
          break
        case 'move':
          if (data.error) {
            console.error(error)
          } else {
            this.episodes.map((episode, index) => {
              if (data.params.episode.origin.path === episode.origin.path) {
                this.getSubtitle(data.params.episode.destination.path)
                this.$set(
                  this.episodes,
                  index,
                  Object.assign(episode, {
                    loading: false,
                    transfered: true
                  })
                )
              }
            })
          }
          break
        default:
          break
        }
        break
      case 'plex':
        switch (data.method) {
        case 'refresh':
          if (data.error) {
            console.error(data.error)
            this.$store('notification/add', {
              message: 'Error when refreshing Plex library !',
              type: 'error'
            })
          } else {
            console.log('[Plex] Refresh Tv Shows...')
          }
          break
        default:
          break
        }
        break
      case 'subtitles':
        switch (data.method) {
        case 'getAll':
          if (data.error) {
            this.error = data.error
          } else {
            this.subtitlesSettings = data.results
          }
          break
        default:
          break
        }
        break
      default:
        break
      }
    }
  },
  methods: {
    search() {
      this.isLoading = true
      this.loadingMessage = 'Searching new files...'
      this.$store.commit('webSocket/send', {
        object: 'transfert',
        method: 'search'
      })
    },
    transfert() {
      if (this.episodes) {
        this.episodes.map((episode, index) => {
          this.move(episode, index)
        })
        this.refreshPlex()
      }
    },
    move(episode, index) {
      this.$set(
        this.episodes,
        index,
        Object.assign(episode, { loading: true })
      )
      this.$store.commit('webSocket/send', {
        object: 'transfert',
        method: 'move',
        params: { episode: episode }
      })
    },
    refreshPlex() {
      this.$store.commit('webSocket/send', {
        object: 'plex',
        method: 'refresh',
        params: { uuid: UUID }
      })
    },
    getSubtitlesSettings() {
      this.$store.commit('webSocket/send', {
        object: 'subtitles',
        method: 'getAll'
      })
    },
    getSubtitle(file) {
      if (
        this.subtitlesSettings &&
        this.subtitlesSettings.downloadAfterTransfert
      ) {
        this.$store.commit('webSocket/send', {
          object: 'subtitles',
          method: 'getSubtitle',
          params: { file: file }
        })
      }
    }
  }
}
</script>
