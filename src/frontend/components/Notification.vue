<template>
  <div class="absolute b:1 r:1 p:1 z:50">
    <transition-group name="list">
      <div
        v-for="item in list"
        :key="item.id"
        class="rounded shadow p:1"
        :class="{ 'bg:green': item.type === 'success'}"
      >{{ item.message }}</div>
    </transition-group>
  </div>
</template>

<script>
import { get } from "vuex-pathify";
export default {
  computed: {
    list: get("notification/list")
  }
};
</script>