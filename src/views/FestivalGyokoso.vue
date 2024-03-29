<template lang="html">
  <div class="festival" :style="setSize" v-if="festivals">
    <div class="festival__banner-panel">
      <div class="festival__title-container">
        <div class="festival__title">
          Festival Gyôkoso
        </div>
        <div class="festival__subtitle">Concours de screenshot mensuel</div>
      </div>
      <template v-for="(winner, index) in festivals.winners" :key="winner.id">
        <div class="festival__banner-container" v-if="currentWinner == index">
          <transition name="fade">
            <div class="festival__banner-helper">
              <img
                class="festival__banner"
                :src="winner.url"
                :alt="
                  winner.User
                    ? festivals.previous.theme + ' par ' + winner.User.character
                    : festivals.previous.theme
                "
                :title="
                  winner.User
                    ? festivals.previous.theme + ' par ' + winner.User.character
                    : festivals.previous.theme
                "
              />
              <div class="festival__legend" v-if="winner.User">
                « {{ festivals.previous.theme }} » par
                {{ winner.User.character }} • Participation gagnante de la
                précédente édition
              </div>
              <div class="festival__legend" v-else>
                « {{ festivals.previous.theme }} », participation gagnante de la
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
        {{ festivals.current.edition }}ème édition du Festival Gyôkoso
      </div>
      <div class="festival__infos">
        <AppButton
          @click="
            festivals.voting
              ? (currentView = 'Submissions')
              : (currentView = 'Submit')
          "
          v-if="currentView == 'Infos'"
        >
          {{ festivals.voting ? "Voter" : "Participer" }}
        </AppButton>
        <AppButton
          @click="currentView = 'Infos'"
          v-if="currentView == 'Submit' || currentView == 'Submissions'"
        >
          Informations
        </AppButton>
        <div class="festival__deadline">
          <AppDate :date="festivals.current.vote" v-if="!festivals.voting"
            >Date limite :</AppDate
          >
          <AppDate :date="festivals.current.end" v-else>Date limite :</AppDate>
        </div>
      </div>

      <!--Current View Component-->
      <transition name="slide-down" mode="out-in">
        <component
          :is="currentViewComponent"
          :festival="festivals.current.id"
        ></component>
      </transition>
    </div>
  </div>
</template>

<script>
import { useMeta } from "vue-meta";
import FestivalInfos from "@/components/FestivalInfos.vue";
import FestivalSubmissions from "@/components/FestivalSubmissions.vue";
import FestivalSubmit from "@/components/FestivalSubmit.vue";
import AppButton from "@/components/AppButton.vue";
import AppDate from "@/components/AppDate.vue";

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
      currentWinner: 0,
      timer: "",
      windowHeight: "",
      views: [
        { button: "Informations", component: "Infos" },
        { button: "Participations", component: "Submissions" }
      ],
      currentView: "Infos"
    };
  },
  components: {
    FestivalInfos,
    FestivalSubmissions,
    FestivalSubmit,
    AppButton,
    AppDate
  },
  mounted() {
    this.checkSize();
    window.addEventListener("resize", this.checkSize);
    this.$store.dispatch("getFestivals", "now").then(festivals => {
      this.festivals = festivals;
      this.carousel();
    });
  },
  beforeUnmounted() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  },
  computed: {
    setSize() {
      return {
        height: this.windowHeight
      };
    },
    currentViewComponent() {
      return "Festival" + this.currentView;
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
      this.timer = setTimeout(() => {
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
  @include responsive(1024) {
    flex-direction: column;
  }
  @include flex;
  &__banner-panel {
    @include flex($direction: column);
    position: relative;
    width: 100%;
    height: 100%;
    background: white;
  }
  &__banner-container {
    @include responsive(425) {
      min-height: 300px;
    }
    @include flex($direction: column);
    position: relative;
    height: 100%;
    min-height: 600px;
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
    @include responsive(1024) {
      width: 100%;
      overflow: visible;
      height: auto;
      padding: 5px 20px;
    }
    width: 50%;
    height: 100%;
    padding: 20px 50px;
    background: white;
    overflow: hidden scroll;
  }
  &__title-container {
    padding: 5px;
    text-align: center;
  }
  &__title {
    @include responsive(320) {
      font-size: 40px;
    }
    @include cursive(50);
    @include font-relief($namazu);
  }
  &__subtitle {
    transform: translateY(-5px);
  }
  &__heading {
    @include responsive(320) {
      font-size: 30px;
    }
    @include cursive(40);
    @include font-relief($namazu);
    text-align: center;
  }
  &__subheading {
    @include responsive(320) {
      font-size: 20px;
    }
    @include title(22);
    text-align: center;
  }
  &__infos {
    @include flex($direction: column, $gap: 10);
    margin-bottom: 20px;
  }
  &__deadline {
    font-size: $font-small;
    margin-top: -5px;
  }
}
</style>
