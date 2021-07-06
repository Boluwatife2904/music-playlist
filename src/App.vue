<template>
  <TheNavbar />
  <div class="container">
    <router-view />
  </div>
</template>

<script>
import TheNavbar from "@/components/layout/TheNavbar.vue";
export default {
  components: { TheNavbar }
}
</script>

<style lang="scss">
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
</style>
