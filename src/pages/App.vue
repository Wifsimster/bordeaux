
<template>
  <div class="app bg:black text:white h:screen w:screen">
    <div class="flex">
      <div class="flex:1">
        <transition name="opacity" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import "beta-scss";
export default {};
</script>