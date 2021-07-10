<template>
  <div class="home">
    <ListViewLoader v-if="isLoading" />
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
import ListViewLoader from '../components/playlists/ListViewLoader.vue';
export default {
  components: { ListView, ListViewLoader },
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
