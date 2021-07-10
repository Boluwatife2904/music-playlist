<template>
  <div class="loaders" v-for="number in 3" :key="number">
    <div class="image loader"></div>
    <div class="content">
      <div class="name loader"></div>
      <div class="description loader"></div>
      <div class="creator loader"></div>
      <div class="songs loader"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListViewLoader",
};
</script>

<style lang="scss" scoped>
.loaders {
  display: flex;
  gap: 20px;
  align-items: center;
  gap: 20px;
  padding: 20px;
  border-radius: 10px;
  margin: 16px 0;
  background: #fff;
  width: 100%;

  .content {
    width: 100%;
  }

  .loader {
    background: rgba(226, 230, 233, 0.8);
    border-radius: 10px;
    margin: 10px 0;
  }

  .image {
    width: 150px;
    height: 150px;
    flex-shrink: 0;
  }

  .name {
    height: 30px;
    width: 60%;
    max-width: 280px;
  }

  .description {
    height: 30px;
    width: 90%;
    max-width: 680px;
  }

  .creator {
    height: 30px;
    max-width: 150px;
    width: 40%;
  }

  .songs {
    height: 30px;
    max-width: 75px;
    width: 90%;
    margin-left: auto;
  }

}
</style>