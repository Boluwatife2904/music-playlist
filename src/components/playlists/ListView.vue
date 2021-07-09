<template>
  <div v-for="playlist in playlists" :key="playlist.id">
    <router-link to="/" class="playlist">
      <div class="playlist-thumbnail">
        <img :src="playlist.coverImage" :alt="playlist.coverImage" class="playlist-cover" />
      </div>
      <div class="playlist-information">
       <h3 class="playlist-title">{{ playlist.title }}</h3>
       <p class="playlist-description">{{ playlist.description }}</p>
       <p class="playlist-creator">Created by {{ playlist.username }}</p>
       <p class="playlist-songs">{{ playlist.songs.length }} songs</p> 
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "ListView",
  props: ["playlists"],
};
</script>

<style lang="scss" scoped>
.playlist {
  text-decoration: none;
  font: inherit;
  display: flex;
  align-items: center;
  width: 100%;
  gap: 20px;
  padding: 20px;
  border-radius: 10px;
  margin: 16px 0;
  background: #fff;
  transition: all .3s linear;

  .playlist-thumbnail {
    width: 150px;
    height: 150px;
    overflow: hidden;
    border-radius: 10px;
    flex-shrink: 0;

    .playlist-cover {
      width: 100%;
      height: 100%;
    }
  }

  .playlist-information {
    width: 100%;

    .playlist-title,
    .playlist-description {
      margin-bottom: 10px;
    }

    .playlist-songs {
      margin-top: 10px;
      text-align: right !important;
    }
  }

  &:hover {
    box-shadow: 1px 3px 5px rgba(50,50,50,0.05);
    transform: scale(1.02);
  }

  @media screen and (max-width: 480px) {
    flex-direction: column;

    .playlist-information {
      text-align: center;
    }
  }
}
</style>