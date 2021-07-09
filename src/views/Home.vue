<template>
  <div class="home">
    <h1>Homepage</h1>
    <div v-if="isLoading">Loading...............</div>
    <div v-else-if="!isLoading && documents.length > 0">
      <ListView :playlists="documents" />
    </div>
    <div v-else-if="!isLoading && documents.length === 0">
      No documents found
    </div>
    <div class="error" v-else>
      {{ error }}
    </div>
  </div>
</template>

<script>
import getCollection from "@/composables/getCollection"
import ListView from '../components/playlists/ListView.vue';
export default {
  components: { ListView },
  name: 'Home',
  setup() {
    const { error, isLoading, documents } = getCollection("playlists");

    return {
      error,
      isLoading,
      documents
    }
  }
}
</script>
