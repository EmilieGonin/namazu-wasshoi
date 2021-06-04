<template lang="html">
  <div class="galleries">
    <div class="galleries__menu">
      <AppButton :iconL="'plus'">Créer une galerie</AppButton>
      <AppButton :iconR="'images'">Mes galeries</AppButton>
    </div>
    <div class="galleries__container">
      <div class="galleries__item" v-for="gallery in galleries" :key="gallery">
        <img class="galleries__img" src="@/assets/sample.png" alt="" />
        <div class="galleries__name">
          {{ gallery.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppButton from "@/components/AppButton.vue";

export default {
  name: "Galleries",
  data() {
    return {
      //temp
      galleries: [
        {
          name: "Test de nom de gallerie un peu long",
          cover: "uc",
          author: "Test"
        },
        {
          name: "Test de nom de gallerie beaucoup plus long",
          cover: "uc",
          author: "Test"
        },
        { name: "Test", cover: "uc", author: "Test" },
        { name: "Test", cover: "uc", author: "Test" },
        { name: "Test", cover: "uc", author: "Test" },
        { name: "Test", cover: "uc", author: "Test" }
      ]
    };
  },
  components: {
    AppButton
  }
};
</script>

<style lang="scss" scoped>
.galleries {
  @include flex($direction: column, $justify: flex-start, $gap: 20);
  margin: 20px 0;
  &__menu {
    @include flex($gap: 5);
    width: 100%;
  }
  &__container {
    @include flex($gap: 5);
    flex-wrap: wrap;
    width: 100%;
    max-width: 1100px;
    margin: 20px;
  }
  &__item {
    cursor: pointer;
    position: relative;
    width: 250px;
    height: 160px;
    border: 3px solid $grey;
    box-shadow: 0 0 1px $main-black;
    &:hover .galleries__name {
      opacity: 1;
      transform: translateY(0);
    }
  }
  &__img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &__name {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 3px 6px;
    background: veil($namazu);
    color: white;
    text-align: center;
    text-overflow: ellipsis;
    font-size: $font-small;
    white-space: nowrap;
    opacity: 0;
    overflow: hidden;
    transition: all 300ms;
    transform: translateY(20%);
  }
}
</style>
