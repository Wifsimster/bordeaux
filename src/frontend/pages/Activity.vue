<template>
  <div class="flex flex:wrap">
    <alert color="red" v-if="error">{{ error }}</alert>

    <div class="sticky w:full t:0 bg:black z:10 px:1/2">
      <div class="flex justify:between items:center">
        <div class="py:1/2">
          <btn @click="yesterday()">&lt;</btn>
        </div>
        <div class="text:2/3">{{ displayISODate(currentDate) }}</div>
        <div class="py:1/2">
          <btn @click="tomorrow()">&gt;</btn>
        </div>
      </div>
    </div>

    <transition name="fade">
      <div v-if="activities">
        <div class="flex flex:wrap sm:p:1/2">
          <div
            v-for="activity in activities"
            :key="activity.date"
            class="w:full flex hover:bg:grey-darkest p:1/2"
          >
            <div class="pr:1">
              <i
                :class="{'error' : activity.type=== 'error', 'warn' : activity.type=== 'warn', 'info' : activity.type=== 'info'}"
              ></i>
            </div>
            <div class="py:1/2" style="min-width: 90px">{{ getTime(activity.date) }}</div>
            <div class="flex:1 py:1">{{ activity.message }}</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import parseISO from "date-fns/parseISO";
import format from "date-fns/format";
import subDays from "date-fns/subDays";
import addDays from "date-fns/addDays";

export default {
  name: "activity",
  computed: {
    message() {
      return this.$store.getters["webSocket/message"];
    }
  },
  data() {
    return {
      error: null,
      activities: null,
      currentDate: null
    };
  },
  created() {
    this.currentDate = new Date();
  },
  watch: {
    currentDate() {
      this.getAll();
    },
    message(data) {
      if (data.object === "activity") {
        switch (data.method) {
          case "getAll":
            if (data.error) {
              this.error = data.error;
            } else {
              this.activities = data.results;
            }
            break;
        }
      }
    }
  },
  methods: {
    yesterday() {
      this.currentDate = subDays(this.currentDate, 1);
    },
    tomorrow() {
      this.currentDate = addDays(this.currentDate, 1);
    },
    getTime(value) {
      return format(parseISO(value), "hh:mm:ss");
    },
    displayISODate(value) {
      return format(value, "MM / dd / yyyy");
    },
    getAll() {
      if (this.currentDate) {
        let date = format(this.currentDate, "yyyy-MM-dd");
        this.$store.commit("webSocket/send", {
          object: "activity",
          method: "getAll",
          params: { date: date }
        });
      }
    }
  }
};
</script>

