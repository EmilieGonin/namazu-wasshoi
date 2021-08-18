<template lang="html">
  <div class="festival" :style="setSize" v-if="festivals">
    <div class="festival__banner-panel">
      <div class="festival__title">
        Festival Gyôkoso
      </div>
      <template v-for="winner in festivals.winners" :key="winner.id">
        <div
          class="festival__banner-container"
          v-if="currentWinner == winner.id"
        >
          <transition name="fade">
            <div class="festival__banner-helper">
              <img
                class="festival__banner"
                :src="winner.url"
                :alt="
                  festivals.previous.theme + ' par ' + winner.User.character
                "
                :title="
                  festivals.previous.theme + ' par ' + winner.User.character
                "
              />
              <div class="festival__legend">
                « {{ festivals.previous.theme }} » par
                {{ winner.User.character }} • Participation gagnante de la
                précédente édition
              </div>
            </div>
          </transition>
        </div>
      </template>
    </div>
    <div class="festival__theme">
      <div class="festival__heading">
        {{ festivals.current.theme }}
      </div>
      <div class="festival__subheading">
        {{ festivals.current.id }}ème édition du Festival Gyôkoso
      </div>
      <div class="festival__infos">
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
            {
              'button--alt--disabled':
                view == 'Participations' && !festivals.voting
            }
          ]"
          @click="
            if (festivals.voting) {
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
import { useMeta } from "vue-meta";
import FestivalInfos from "@/components/FestivalInfos.vue";
import FestivalSubmissions from "@/components/FestivalSubmissions.vue";
import AppButton from "@/components/AppButton.vue";

export default {
  name: "FestivalGyokoso",
  setup() {
    useMeta({
      title: "Festival Gyôkoso"
    });
  },
  data() {
    return {
      festivals: "",
      currentWinner: 1,
      windowHeight: "",
      views: ["Informations", "Participations"],
      currentView: "Informations"
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
    this.$store.dispatch("getFestivals", "now").then(festivals => {
      this.festivals = festivals;
      this.carousel();
    });
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
    },
    carousel() {
      setTimeout(() => {
        this.currentWinner++;
        setTimeout(() => {
          this.currentWinner--;
          this.carousel();
        }, 5000);
      }, 5000);
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
  &__banner-panel {
    @include flex($justify: space-between, $direction: column);
    position: relative;
    width: 100%;
    height: 100%;
    background: white;
  }
  &__banner-container {
    @include flex($direction: column);
    position: relative;
    margin: 10px;
    height: 100%;
    width: 100%;
    border: 3px solid white;
    box-shadow: 0 0 2px $main-black;
  }
  &__banner-helper {
    @include absolute-center;
  }
  &__banner {
    @include absolute-center;
    display: block;
    width: 100%;
    height: 100%;
    min-height: 400px;
    object-fit: cover;
  }
  &__legend {
    @include responsive(700) {
      font-size: $font-small - 2;
    }
    @include flex;
    position: absolute;
    bottom: 0;
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
    padding: 5px;
  }
  &__heading {
    @include cursive(35);
    @include font-relief($namazu);
    text-align: center;
  }
  &__subheading {
    @include title(25);
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
