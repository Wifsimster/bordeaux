<template>
  <div>
    <div class="p:1">
      <alert color="red" v-if="error">{{ error }}</alert>
      <div class="flex h:full items:center justify:center">
        <div class="text:2">Dashboard</div>
        <alert>Hi there :)</alert>
      </div>
    </div>
  </div>
</template>
