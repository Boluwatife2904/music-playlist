<template>
  <h2>My Playlists</h2>
  <ListViewLoader v-if="isLoading" />
  <div v-else-if="!isLoading && userPlaylists.length > 0">
    <ListView :playlists="userPlaylists" />
    <router-link :to="{ name: 'CreatePlaylist' }" class="btn">Add New Playlist</router-link>
  </div>
  <div v-else-if="!isLoading && userPlaylists.length === 0">
    Seems like you haven't added any yet!
  </div>
</template>

<script>
import getCollection from "@/composables/getCollection";
import getUser from "@/composables/getCurrentUser.js";
import ListView from "@/components/playlists/ListView.vue";
import ListViewLoader from "@/components/playlists/ListViewLoader.vue";

export default {
  name: "UserPlaylists",
  components: { ListView, ListViewLoader },
  setup() {
    const { user } = getUser();
    const {
      error,
      isLoading,
      documents: userPlaylists,
    } = getCollection("playlists", ["userId", "==", user.value.uid]);
    return {
      error,
      isLoading,
      userPlaylists,
    };
  },
};
</script>

<style>
</style>