<template>
  <form @submit.prevent="createPlaylist">
    <h3>Create Playlist</h3>
    <input
      type="text"
      name="title"
      id="title"
      placeholder="Playlist Title"
      v-model.trim="title"
    />
    <textarea
      name="description"
      id="description"
      cols="30"
      rows="6"
      v-model="description"
      placeholder="Playlist Description"
    ></textarea>
    <!-- Upload playlist cover image -->
    <label for="cover-image">Choose playlist cover image</label>
    <input
      type="file"
      name="cover-image"
      id="cover-image"
      accept="image/*"
      @change="handleFileChanges"
    />
    <div class="error" v-if="fileError">{{ fileError }}</div>
    <button :disabled="isLoading">
      <span v-if="isLoading">Creating Playlist...</span>
      <span v-else>Create Playlist</span> 
    </button>
  </form>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router"
import useStorage from "@/composables/useStorage";
import useCollection from "@/composables/useCollection";
import getUser from "@/composables/getCurrentUser";
import { timestamp } from "@/firebase/config";

export default {
  name: "CreatePlaylist",
  setup() {
    const router = useRouter();
    const { user } = getUser();
    const { error, addDocument } = useCollection("playlists");
    const { url, filePath, uploadImage } = useStorage();
    const title = ref("");
    const description = ref("");
    const coverImage = ref(null);
    const fileError = ref(null);
    const isLoading = ref(false);

    const allowedImagesFormats = ["image/jpeg", "image/png", "image/webp"];

    const handleFileChanges = (event) => {
      const selectedImage = event.target.files[0];
      if (selectedImage && allowedImagesFormats.includes(selectedImage.type)) {
        coverImage.value = selectedImage;
        fileError.value = null;
      } else {
        coverImage.value = null;
        fileError.value = "You need to select an image as the cover image";
      }
    };

    const createPlaylist = async () => {
      if (coverImage.value) {
        isLoading.value = true;
        await uploadImage(coverImage.value);
        await addDocument({
          title: title.value,
          description: description.value,
          coverImage: url.value,
          userId: user.value.uid,
          username: user.value.displayName,
          filePath: filePath.value,
          songs: [],
          createdAt: timestamp(),
        });
        if (!error.value) {
          console.log("Playlist successfully added");
          isLoading.value = false;
          router.push({ name: "Home"});
        }
      }
    };

    return { title, description, createPlaylist, handleFileChanges, fileError, isLoading };
  },
};
</script>

<style scoped>
input[type="file"] {
  border: 0;
  padding: 0;
}

label {
  font-size: 12px;
  display: block;
  margin-top: 30px;
}

button {
  margin-top: 20px;
}
</style>