<template>
  <button
    class="bg:grey-dark hover:bg:grey-darker text:white text:bold rounded shadow cursor:pointer px:1/2 py:1"
    :class="{'opacity:50 cursor:not-allowed':disabled }"
    @click="$emit('click')"
  >
    <slot name="default"></slot>
  </button>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  }
};
</script>


