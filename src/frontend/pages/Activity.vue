<template>
  <div class="flex flex:wrap">
    <alert color="red" v-if="error">{{ error }}</alert>

    <div class="sticky w:full t:0 bg:black z:10 py:1/2">
      <div class="flex justify:between items:center">
        <div class="py:1/2">
          <a
            @click="yesterday()"
            class="text:bold cursor:pointer m:1/2 py:1/2 px:3/4 text:3/2 hover:bg:grey-darkest rounded:full"
          >&lt;</a
          >
        </div>
        <div class="text:2/3">{{ displayISODate(currentDate) }}</div>
        <div class="py:1/2">
          <a
            @click="tomorrow()"
            class="text:bold cursor:pointer m:1/2 py:1/2 px:3/4 text:3/2 hover:bg:grey-darkest rounded:full"
          >&gt;</a
          >
        </div>
      </div>
    </div>

    <transition name="fade">
      <div v-if="activities" class="w:full">
        <div v-if="activities.length > 0">
          <div class="flex flex:wrap sm:p:1/2">
            <div
              v-for="activity in activities"
              :key="activity.date"
              class="w:full flex hover:bg:grey-darkest p:1/2"
            >
              <div class="pr:1" style="min-width: 30px">
                <i
                  :class="{
                    error: activity.type === 'error',
                    warn: activity.type === 'warn',
                    info: activity.type === 'info'
                  }"
                ></i>
              </div>
              <div class="px:1/2" style="min-width: 120px">
                {{ getTime(activity.date) }}
              </div>
              <div class="px:1" style="min-width: 125px">
                {{ activity.object }}
              </div>
              <div class="flex:1 px:1">{{ activity.message }}</div>
            </div>
          </div>
        </div>
        <div v-else class="text:center">No result</div>
      </div>
    </transition>
  </div>
</template>

<script>
import parseISO from 'date-fns/parseISO'
import format from 'date-fns/format'
import subDays from 'date-fns/subDays'
import addDays from 'date-fns/addDays'
import compareDesc from 'date-fns/compareDesc'

export default {
  name: 'activity',
  computed: {
    message() {
      return this.$store.getters['webSocket/message']
    }
  },
  data() {
    return {
      error: null,
      activities: null,
      currentDate: null
    }
  },
  created() {
    this.currentDate = new Date()
  },
  watch: {
    currentDate() {
      this.getAll()
    },
    message(data) {
      if (data.object === 'activity') {
        switch (data.method) {
        case 'getAll':
          if (data.error) {
            this.error = data.error
          } else {
            this.activities = Object.assign([], data.results)
            this.activities = this.activities.sort((a, b) =>
              compareDesc(new Date(a.date), new Date(b.date))
            )
          }
          break
        default:
          break
        }
      }
    }
  },
  methods: {
    yesterday() {
      this.currentDate = subDays(this.currentDate, 1)
    },
    tomorrow() {
      this.currentDate = addDays(this.currentDate, 1)
    },
    getTime(value) {
      return format(parseISO(value), 'hh:mm:ss a')
    },
    displayISODate(value) {
      return format(value, 'MM / dd / yyyy')
    },
    getAll() {
      if (this.currentDate) {
        let date = format(this.currentDate, 'yyyy-MM-dd')
        this.$store.commit('webSocket/send', {
          object: 'activity',
          method: 'getAll',
          params: { date: date }
        })
      }
    }
  }
}
</script>
