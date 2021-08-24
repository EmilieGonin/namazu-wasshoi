<template lang="html">
  <div class="festival" v-if="festivals">
    <div class="festival__line"></div>
    <template v-for="winner in festivals.winners" :key="winner.id">
      <div
        class="festival__banner-container"
        v-show="currentWinner == winner.id"
      >
        <transition name="fade">
          <div>
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
    <div class="festival__theme-container">
      <div class="festival__infos festival__infos--heading">
        <span v-if="festivals.voting">Les votes sont ouverts !</span>
        <span v-else
          >Participez à la {{ festivals.current.edition }}ème édition !</span
        >
      </div>
      <div class="festival__theme">
        <div class="festival__name">
          Festival Gyôkoso
        </div>
        <span class="festival__infos"> « {{ festivals.current.theme }} » </span>
        <AppButton
          class="festival__button"
          :iconR="'arrow-right'"
          :link="'/festival-gyokoso'"
        >
          {{ festivals.voting ? "Voter" : "Participer" }}
        </AppButton>
      </div>
      <div class="festival__infos festival__infos--heading">
        <AppDate :date="festivals.current.end_date">Date limite :</AppDate>
      </div>
    </div>
  </div>
</template>

<script>
import AppButton from "@/components/AppButton.vue";
import AppDate from "@/components/AppDate.vue";

export default {
  name: "HomeFestival",
  data() {
    return {
      festivals: "",
      currentWinner: 1,
      timer: ""
    };
  },
  components: {
    AppButton,
    AppDate
  },
  mounted() {
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
  methods: {
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
    @include responsive(820) {
      width: 90%;
      margin: auto;
    }
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
  &__theme-container {
    @include responsive(820) {
      display: none;
    }
    @include absolute-center;
    @include flex($direction: column, $align: stretch);
    left: unset;
    right: 12%;
    width: 25%;
    max-width: 475px;
    height: 50%;
    text-align: center;
  }
  &__theme {
    @include flex($direction: column);
    padding: 40px 20px;
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
    @include cursive(37);
    color: $namazu;
  }
  &__infos {
    @include responsive(1195) {
      font-size: $font-small;
    }
    @include responsive(950) {
      font-size: $font-small - 2;
    }
    &--heading {
      width: 90%;
      margin: 0 auto;
      padding: 5px;
      background: dark($namazu);
      color: $minor-white;
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
