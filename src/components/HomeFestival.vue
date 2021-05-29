<template lang="html">
  <div class="festival">
    <div class="festival__line"></div>
    <div class="festival__banner-container">
      <img class="festival__banner" src="@/assets/festival.png" alt="" />
      <div class="festival__legend">
        « Theme » par Gagnant • Participation gagnante de la précédente édition
      </div>
    </div>
    <div class="festival__theme">
      <div class="festival__infos festival__infos--heading">
        Participez à la xème édition du
      </div>
      <div class="festival__name">
        Festival Gyôkoso
      </div>
      <span class="festival__infos">
        « Incarner un boss de défi extrême »
      </span>
      <AppButton class="festival__button" :iconR="'arrow-right'"
        >Participer</AppButton
      >
    </div>
  </div>
</template>

<script>
import AppButton from "@/components/AppButton.vue";

export default {
  name: "HomeFestival",
  components: {
    AppButton
  }
};
</script>

<style lang="scss" scoped>
.festival {
  @include responsive(700) {
    padding: 10% 0 0 0;
  }
  position: relative;
  width: 100%;
  padding: 2% 0;
  background: white;
  &__line {
    @include absolute-center;
    width: 100%;
    max-height: 20%;
    background: $namazu;
  }
  &__banner-container {
    @include responsive(700) {
      width: 100%;
      margin: 0;
    }
    position: relative;
    width: 70%;
    margin-left: 5%;
  }
  &__banner {
    display: block;
    width: 100%;
    max-height: 70%;
    min-height: 300px;
    object-fit: cover;
  }
  &__legend {
    @include responsive(700) {
      font-size: $font-small - 2;
      text-align: center;
    }
    @include flex($justify: flex-start);
    position: absolute;
    bottom: 2%;
    width: 100%;
    padding: 10px 27px;
    background: $namazu;
    color: $minor-white;
    font-size: $font-small;
  }
  &__theme {
    @include responsive(700) {
      display: none;
    }
    @include absolute-center;
    @include flex($direction: column);
    text-align: center;
    left: unset;
    right: 12%;
    width: 25%;
    max-width: 475px;
    padding: 20px;
    height: 30%;
    background: white;
    border: 5px solid dark($namazu);
    box-shadow: 1px 1px 2px $main-black;
  }
  &__name {
    @include responsive(1195) {
      font-size: $font-xxl;
    }
    @include responsive(950) {
      font-size: $font-large - 2;
    }
    @include cl-name(37);
    color: $namazu;
  }
  &__infos {
    @include responsive(1195) {
      font-size: $font-small;
    }
    &--heading {
      @include responsive(1020) {
        display: none;
      }
    }
  }
  &__button {
    @include responsive(950) {
      font-size: $font-small;
    }
    margin-top: 10px;
  }
}
</style>
