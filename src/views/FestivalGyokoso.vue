<template lang="html">
  <div class="festival" :style="setSize">
    <div class="festival__banner-container">
      <div class="festival__title">
        Festival Gyôkoso
      </div>
      <img class="festival__banner" src="@/assets/festival.png" alt="" />
      <div class="festival__legend">
        « Theme » par Gagnant • Participation gagnante de la précédente édition
      </div>
    </div>
    <div class="festival__theme">
      <div class="festival__heading">
        xème édition du Festival Gyôkoso
      </div>
      <div class="festival__infos">
        Les inscriptions sont ouvertes !
        <AppButton>Participer</AppButton>
        <span class="festival__deadline">Date limite : 25/06 - 20:00</span>
      </div>
      <div class="festival__menu">
        <AppButton
          v-for="view in views"
          :key="view"
          :class="[
            'button--alt',
            {
              'button--alt--inactive': currentView != view
            },
            { 'button--alt--disabled': view == 'Participations' && !voting }
          ]"
          @click="
            if (voting) {
              currentView = view;
            }
          "
        >
          {{ view }}
        </AppButton>
      </div>
      <transition name="slide-down" mode="out-in">
        <component :is="currentViewComponent"></component>
      </transition>
    </div>
  </div>
</template>

<script>
import FestivalInfos from "@/components/FestivalInfos.vue";
import FestivalSubmissions from "@/components/FestivalSubmissions.vue";
import AppButton from "@/components/AppButton.vue";

export default {
  name: "FestivalGyokoso",
  data() {
    return {
      windowHeight: "",
      views: ["Informations", "Participations"],
      currentView: "Informations",
      //temp
      voting: false
    };
  },
  components: {
    FestivalInfos,
    FestivalSubmissions,
    AppButton
  },
  mounted() {
    this.checkSize();
    window.addEventListener("resize", this.checkSize);
  },
  computed: {
    setSize() {
      return {
        height: this.windowHeight
      };
    },
    currentViewComponent() {
      if (this.currentView == "Informations") {
        return "FestivalInfos";
      } else if (this.currentView == "Participations") {
        return "FestivalSubmissions";
      } else {
        return "";
      }
    }
  },
  methods: {
    checkSize() {
      if (window.innerWidth > 940) {
        this.windowHeight = window.innerHeight - 43 + "px";
      } else {
        this.windowHeight = "unset";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.festival {
  @include responsive(940) {
    flex-direction: column;
  }
  @include flex;
  &__banner-container {
    @include flex($direction: column);
    position: relative;
    width: 100%;
    height: 100%;
  }
  &__banner {
    display: block;
    width: 100%;
    height: 100%;
    min-height: 400px;
    object-fit: cover;
    border-top: 3px solid white;
    box-shadow: 0 0 2px $main-black;
  }
  &__legend {
    @include responsive(700) {
      font-size: $font-small - 2;
    }
    @include flex;
    width: 100%;
    padding: 10px 27px;
    background: $namazu;
    color: $minor-white;
  }
  &__line {
    @include absolute-center;
    z-index: -1;
    background: $namazu;
    height: 200px;
  }
  &__theme {
    @include responsive(940) {
      width: 100%;
      overflow: visible;
      height: auto;
    }
    width: 50%;
    height: 100%;
    padding: 50px;
    padding-bottom: 20px;
    background: white;
    overflow: hidden scroll;
  }
  &__menu {
    @include flex($gap: 10);
    margin-bottom: 20px;
  }
  &__title {
    @include flex;
    @include cursive(50);
    @include font-relief($namazu);
    width: 100%;
    background: white;
    padding: 5px;
  }
  &__heading {
    @include title(30);
    text-align: center;
  }
  &__infos {
    @include flex($direction: column, $gap: 10);
  }
  &__deadline {
    font-size: $font-small;
    margin-top: -5px;
  }
}
</style>
