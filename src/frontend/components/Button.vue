<template>
  <button
    class="bg:grey-dark hover:bg:grey-darker text:white text:bold rounded shadow cursor:pointer"
    :class="{'opacity:50 cursor:not-allowed':disabled, 'px:1 py:2': size === 'md', 'px:1/4 py:1/2': size === 'sm'}"
    @click="$emit('click')"
  >
    <slot name="default"></slot>
  </button>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: "md"
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
};
</script>


