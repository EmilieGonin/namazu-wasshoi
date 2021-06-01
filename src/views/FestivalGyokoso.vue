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
      <div class="festival__heading festival__heading--main">
        Participez à la xème édition du Festival Gyôkoso
      </div>
      <div class="festival__rules">
        <div class="festival__heading">
          Informations
        </div>
        <span>
          Le Festival Gyôkoso est un concours mensuel de glamour et screenshots
          au terme duquel sont élus deux Namazu dorés ! Participer et remporter
          le festival vous feront tout deux gagner des points pour votre équipe.
        </span>
        <div class="festival__heading">
          Règles de participations
        </div>
        <p>
          - Les candidatures doivent d'être envoyées en privé à la @🔴GM👑.
        </p>
        <p>
          - Vous êtes libre d'interpréter le thème comme vous le sentez, et vous
          devrez expliquer votre interprétation du thème en une ou deux phrases,
          donc choisissez bien vos mots !
        </p>
        <p>
          - Vous pouvez accompagner votre participation d'une piste musicale
          afin de renforcer votre interprétation.
        </p>
        <p>
          - Vous êtes autorisés à utiliser Photoshop, mais uniquement pour
          corriger la luminosité et les couleurs ou flouter/renforcer votre
          image.
        </p>
        <p>
          - Les gagnants de l'édition précédente peuvent participer pour tenter
          de conserver leur titre.
        </p>
        <p>
          - Vous pouvez demander à une ou plusieurs personnes de poser avec
          vous, même si ces personnes participent de leur côté.
        </p>
        <p>
          - Les shaders sont autorisés ! Vous pouvez demander de l'aide pour
          installer GShade sur votre ordinateur auprès de la @🔴GM👑, des
          @🔴Officiers👑 ou même des autres membres !
        </p>
        <p>- Les mods sont interdits !</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FestivalGyokoso",
  data() {
    return {
      windowHeight: ""
    };
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
      overflow: visible;
      height: auto;
    }
    width: 50%;
    height: 100%;
    padding: 50px;
    background: white;
    overflow: auto;
  }
  &__title {
    @include flex;
    @include cursive(50);
    width: 100%;
    background: white;
    color: $namazu;
    padding: 5px;
    text-shadow: 1px 1px 1px dark($namazu);
  }
  &__heading {
    @include title(30);
    &--main {
      text-align: center;
      margin-bottom: 20px;
    }
  }
}
</style>
