
<template>
  <div class="app">
    <div class="wrapper">
      <div class="container">
        <transition name="opacity" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>


<style lang="scss">
</style>