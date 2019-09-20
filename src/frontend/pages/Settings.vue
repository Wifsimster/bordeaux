<template>
  <div class="flex flew:wrap">
    <sidebar class="flex:initial h:screen overflow:hidden" />
    <div class="flex:1 flex flex:wrap justify:center">
      <router-view />
    </div>
  </div>
</template>

<script>
import Sidebar from "components/settings/sidebar.vue";
export default {
  components: {
    Sidebar
  }
};
</script>

