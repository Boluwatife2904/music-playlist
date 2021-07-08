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
    <button>Create Playlist</button>
  </form>
</template>

<script>
import { ref } from "vue";
import useStorage from "@/composables/useStorage";

export default {
  name: "CreatePlaylist",
  setup() {
    const title = ref("");
    const description = ref("");
    const coverImage = ref(null);
    const fileError = ref(null);
    const { url, filePath, uploadImage } = useStorage();

    const allowedImagesFormats = ["image/jpeg", "image/png"];

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
        await uploadImage(coverImage.value);
        console.log("Image uploaded:", url.value);
        // console.log(title.value, description.value, coverImage.value);
      }
    };

    return { title, description, createPlaylist, handleFileChanges, fileError };
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