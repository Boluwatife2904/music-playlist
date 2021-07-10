<template>
  <div v-if="isLoading">Loading............</div>
  <div v-else-if="!isLoading && playlist" class="playlist-details">
    <div class="left-column">
      <div class="playlist-cover">
        <img :src="playlist.coverImage" :alt="playlist.title" />
      </div>
      <div class="playlist-information">
        <h2>{{ playlist.title }}</h2>
        <p>{{ playlist.description }}</p>
        <p>Created by {{ playlist.username }}</p>
      <button
        v-if="hasOwnership"
        class="delete"
        @click="deletePlaylist"
      >
        Delete
      </button>
      </div>
    </div>
    <div class="right-column">
      <div class="playlist-songs">
        <p>List of songs in playlist</p>
      </div>
    </div>
  </div>
  <div v-else-if="!isLoading && !playlist">
    The requested playlist might have been deleted.
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import getDocument from "@/composables/getSingleDocument";
import useCollection from "@/composables/useCollection";
import useStorage from "@/composables/useStorage";
import getUser from "@/composables/getCurrentUser";
import { computed } from "vue";
export default {
  props: ["playlistId"],
  setup(props) {
    const router = useRouter();
    const {
      isLoading,
      error,
      document: playlist,
    } = getDocument("playlists", props.playlistId);
    const { deleteDocument } = useCollection("playlists");
    const { deleteImage } = useStorage();

    const { user } = getUser();

    const hasOwnership = computed(() => {
      return playlist.value && user.value && playlist.value.userId === user.value.uid;
    })
    
    const deletePlaylist = async () => {
      await deleteDocument(props.playlistId);
      await deleteImage(playlist.value.filePath)
      router.push({ name: 'Home' })
    }

    return {
      error,
      playlist,
      isLoading,
      user,
      hasOwnership,
      deletePlaylist
    };
  },
};
</script>

<style lang="scss" scoped>
.playlist-details {
  display: flex;
  gap: 40px;

  .left-column {
    flex: 0 0 400px;
    max-width: 400px;
  }

  .playlist-cover {
    width: 400px;
    height: 400px;
    margin: 0 auto 30px;
    overflow: hidden;
    border-radius: 20px;

    img {
      height: 100%;
      width: 100%;
    }
  }

  .playlist-information {
    text-align: center;

    h2,
    p {
      margin-bottom: 10px;
    }

    p {
      line-height: 24px;
    }
  }
}
</style>