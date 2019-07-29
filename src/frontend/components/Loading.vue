<template>
  <div v-if="isLoading">loading ...</div>
</template>

<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false
    }
  }
};
</script>