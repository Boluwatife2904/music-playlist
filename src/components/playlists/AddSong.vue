<template>
  <div class="add-song">
    <form v-if="showForm" @submit.prevent="addNewSong" autocomplete="off">
      <h4>Add Song to Playlist</h4>
      <input
        type="text"
        name="title"
        id="title"
        placeholder="Song's Title"
        v-model.trim="title"
      />
      <input
        type="text"
        name="artist"
        id="artist"
        placeholder="Song's Artist"
        v-model.trim="artist"
      />
      <button>Add</button>
    </form>
    <button v-else @click="toggleForm">Add Song</button>
  </div>
</template>

<script>
import { ref } from "vue";
import useCollection from "@/composables/useCollection.js";
export default {
  name: "AddSong",
  props: ["playlist"],
  setup(props) {
    const title = ref("");
    const artist = ref("");
    const showForm = ref(false);
    const { updateDocument } = useCollection("playlists");

    const toggleForm = () => (showForm.value = !showForm.value);

    const addNewSong = async () => {
      if (title.value === "" || artist.value === "") {
        alert("Fill in the fields");
        return;
      }
      const newSong = {
        title: title.value,
        artist: artist.value,
        id: Math.floor(Math.random() * 1000000000),
      };
      await updateDocument(props.playlist.id, {
        songs: [...props.playlist.songs, newSong],
      });
      title.value = "";
      artist.value = "";
      toggleForm();
    };

    return {
      title,
      artist,
      showForm,
      toggleForm,
      addNewSong,
    };
  },
};
</script>

<style lang="scss" scoped>
.add-song {
  margin-top: 40px;

  form {
    margin-left: 0;
  }
}
</style>