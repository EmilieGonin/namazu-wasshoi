<template lang="html">
  <div class="cell">
    <div class="cell__head">
      <div class="cell__profile">
        <!--Character Name-->
        <div
          class="cell__title"
          @click="applicant ? redirect(data.characterId) : go(data.id)"
        >
          {{ data.character }}
        </div>
        <!--Team-->
        <div v-if="data.team">
          <strong :class="data.team ? data.team.toLowerCase() : ''">
            {{ data.team }}
          </strong>
        </div>
        <!--Name-->
        <div v-if="data.name">
          <font-awesome-icon :icon="'user'" fixed-width />
          {{ data.name }}
        </div>
        <!--Discord-->
        <div v-if="data.discord">
          <font-awesome-icon :icon="['fab', 'discord']" fixed-width />
          {{ data.discord }}
        </div>
        <!--Birthday-->
        <div v-if="data.birthday">
          <font-awesome-icon :icon="'gift'" fixed-width />
          {{ data.birthday }}
        </div>
        <!--Mic-->
        <font-awesome-layers v-if="applicant">
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
      <AppButton @click="toggle = !toggle" v-if="applicant">
        <span v-if="!toggle">Afficher la candidature</span>
        <span v-else>Fermer la candidature</span>
      </AppButton>
      <!--Archive Applicant/Delete User-->
      <AppButton :small="true" @click="archive(data.id)">
        <font-awesome-icon :icon="'trash-alt'" fixed-width />
      </AppButton>
    </div>
    <transition name="slide-up">
      <div class="cell__body" v-show="toggle" v-if="applicant">
        <!--Availability-->
        <div class="cell__tab">
          <div class="cell__cell cell__cell--question">
            Disponibilités
          </div>
          <div class="cell__cell cell__cell--answer">
            {{ applicant.availability }}
          </div>
        </div>
        <!--About-->
        <div class="cell__tab">
          <div class="cell__cell cell__cell--question">
            À propos
          </div>
          <div class="cell__cell cell__cell--answer">
            {{ applicant.about }}
          </div>
        </div>
        <!--Main Class-->
        <div class="cell__tab">
          <div class="cell__cell cell__cell--question">
            Classe principale
          </div>
          <div class="cell__cell cell__cell--answer">
            {{ applicant.mainClass }}
          </div>
        </div>
        <!--Playtime-->
        <div class="cell__tab">
          <div class="cell__cell cell__cell--question">
            Temps de jeu
          </div>
          <div class="cell__cell cell__cell--answer">
            {{ applicant.playtime }}
          </div>
        </div>
        <!--Game Activities-->
        <div class="cell__tab">
          <div class="cell__cell cell__cell--question">
            Activités préférées
          </div>
          <div class="cell__cell cell__cell--answer">
            {{ applicant.gameActivities }}
          </div>
        </div>
        <!--CL-->
        <div class="cell__tab">
          <div class="cell__cell cell__cell--question">
            Choix de CL
          </div>
          <div class="cell__cell cell__cell--answer">
            {{ applicant.cl }}
          </div>
        </div>
        <!--CL Required-->
        <div class="cell__tab">
          <div class="cell__cell cell__cell--question">
            Critères obligatoires
          </div>
          <div class="cell__cell cell__cell--answer">
            {{ applicant.clRequired }}
          </div>
        </div>
        <!--Current CL-->
        <div class="cell__tab">
          <div class="cell__cell cell__cell--question">
            CL actuelle
          </div>
          <div class="cell__cell cell__cell--answer">
            {{ applicant.currentCl }}
          </div>
        </div>
        <!--exp-->
        <div class="cell__tab">
          <div class="cell__cell cell__cell--question">
            Expérience HL
          </div>
          <div class="cell__cell cell__cell--answer">
            {{ applicant.exp }}
          </div>
        </div>
        <!--Savage-->
        <div class="cell__tab">
          <div class="cell__cell cell__cell--question">
            Roster sadique
          </div>
          <div class="cell__cell cell__cell--answer">
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
  name: "AdminPanelCell",
  components: {
    AppButton
  },
  data() {
    return {
      toggle: false
    };
  },
  props: {
    data: Object,
    applicant: Boolean
  },
  methods: {
    redirect(id) {
      const lodestone = "https://fr.finalfantasyxiv.com/lodestone/character/";
      window.open(lodestone + id);
    },
    go(id) {
      this.$router.push("/user/" + id);
    },
    archive(id) {
      console.log(id);
    }
  }
};
</script>

<style lang="scss" scoped>
.cell {
  @include flex($direction: column);
  position: relative;
  width: 100%;
  max-width: 1200px;
  padding: 5px;
  margin: auto;
  &__head {
    @include flex($gap: 10, $align: stretch);
    flex-wrap: wrap;
    width: 100%;
  }
  &__title {
    @include page-title;
    transform: translateY(2px);
    cursor: pointer;
  }
  &__profile {
    @include flex($gap: 10, $justify: flex-start);
    flex-wrap: wrap;
    border: 2px solid $namazu;
    width: 100%;
    max-width: 800px;
    padding: 3px 10px;
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
