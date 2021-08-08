<template lang="html">
  <div class="applicant">
    <!--Character Name-->
    <div class="applicant__title">
      {{ applicant.character }}
    </div>
    <div class="applicant__profile">
      <!--Name-->
      <div v-if="applicant.name">
        <font-awesome-icon :icon="'user'" fixed-width />
        {{ applicant.name }}
      </div>
      <!--Discord-->
      <div>
        <font-awesome-icon :icon="['fab', 'discord']" fixed-width />
        {{ applicant.discord }}
      </div>
      <!--Birthday-->
      <div>
        <font-awesome-icon :icon="'gift'" fixed-width />
        {{ applicant.birthday }}
      </div>
      <!--Mic-->
      <font-awesome-layers>
        <font-awesome-icon :icon="'microphone'" fixed-width />
        <font-awesome-icon
          :icon="'check-circle'"
          transform="shrink-6 left-10 down-4"
          class="valid"
          v-if="applicant.mic"
        />
        <font-awesome-icon
          :icon="'times-circle'"
          transform="shrink-6 left-10 down-4"
          class="invalid"
          v-else
        />
      </font-awesome-layers>
    </div>
    <AppButton @click="toggle = !toggle">
      <span v-if="!toggle">Afficher la candidature</span>
      <span v-else>Fermer la candidature</span>
    </AppButton>
    <transition name="slide-up">
      <div class="applicant__body" v-show="toggle">
        <!--Availability-->
        <div class="applicant__tab">
          <div class="applicant__cell applicant__cell--question">
            Disponibilités
          </div>
          <div class="applicant__cell applicant__cell--answer">
            {{ applicant.availability }}
          </div>
        </div>
        <!--About-->
        <div class="applicant__tab">
          <div class="applicant__cell applicant__cell--question">
            À propos
          </div>
          <div class="applicant__cell applicant__cell--answer">
            {{ applicant.about }}
          </div>
        </div>
        <!--Main Class-->
        <div class="applicant__tab">
          <div class="applicant__cell applicant__cell--question">
            Classe principale
          </div>
          <div class="applicant__cell applicant__cell--answer">
            {{ applicant.mainClass }}
          </div>
        </div>
        <!--Playtime-->
        <div class="applicant__tab">
          <div class="applicant__cell applicant__cell--question">
            Temps de jeu
          </div>
          <div class="applicant__cell applicant__cell--answer">
            {{ applicant.playtime }}
          </div>
        </div>
        <!--Game Activities-->
        <div class="applicant__tab">
          <div class="applicant__cell applicant__cell--question">
            Activités préférées
          </div>
          <div class="applicant__cell applicant__cell--answer">
            {{ applicant.gameActivities }}
          </div>
        </div>
        <!--CL-->
        <div class="applicant__tab">
          <div class="applicant__cell applicant__cell--question">
            Choix de CL
          </div>
          <div class="applicant__cell applicant__cell--answer">
            {{ applicant.cl }}
          </div>
        </div>
        <!--CL Required-->
        <div class="applicant__tab">
          <div class="applicant__cell applicant__cell--question">
            Critères obligatoires
          </div>
          <div class="applicant__cell applicant__cell--answer">
            {{ applicant.clRequired }}
          </div>
        </div>
        <!--Current CL-->
        <div class="applicant__tab">
          <div class="applicant__cell applicant__cell--question">
            CL actuelle
          </div>
          <div class="applicant__cell applicant__cell--answer">
            {{ applicant.currentCl }}
          </div>
        </div>
        <!--exp-->
        <div class="applicant__tab">
          <div class="applicant__cell applicant__cell--question">
            Expérience HL
          </div>
          <div class="applicant__cell applicant__cell--answer">
            {{ applicant.exp }}
          </div>
        </div>
        <!--Savage-->
        <div class="applicant__tab">
          <div class="applicant__cell applicant__cell--question">
            Roster sadique
          </div>
          <div class="applicant__cell applicant__cell--answer">
            {{ applicant.savageRequired }}
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import AppButton from "@/components/AppButton.vue";

export default {
  name: "AdminPanelApplicants",
  components: {
    AppButton
  },
  data() {
    return {
      toggle: false
    };
  },
  props: {
    applicant: Object
  }
};
</script>

<style lang="scss" scoped>
.applicant {
  @include flex($direction: column);
  position: relative;
  width: 100%;
  max-width: 600px;
  padding: 5px;
  &__title {
    @include page-title;
  }
  &__profile {
    @include flex($gap: 10, $justify: flex-start);
    flex-wrap: wrap;
    transform: translateY(-5px);
  }
  &__body {
    @include flex($gap: 10);
    flex-wrap: wrap;
    margin: 15px 0;
    overflow: hidden;
  }
  &__tab {
    @include flex($direction: column);
    width: 100%;
    max-width: 290px;
  }
  &__cell {
    width: 100%;
    padding: 5px;
    font-size: $font-small;
    &--question {
      background-color: $namazu;
      border: 2px solid $namazu;
      color: white;
      text-align: center;
    }
    &--answer {
      height: 125px;
      overflow: auto;
      border: 2px solid fade-out(black, 0.7);
      border-radius: 0 0 5px 5px;
      border-top: none;
    }
  }
}
</style>
