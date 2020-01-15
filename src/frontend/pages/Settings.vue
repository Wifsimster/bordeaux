<template>
  <div class="flex flew:wrap min-h:full">
    <sidebar class="flex:initial" />
    <div class="flex:1 flex flex:wrap justify:center">
      <transition name="slide:right" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import Sidebar from 'components/settings/sidebar.vue'
export default {
  components: {
    Sidebar
  }
}
</script>

