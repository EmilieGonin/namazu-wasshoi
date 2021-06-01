<template lang="html">
  <div class="apply">
    <div class="apply__line"></div>
    <img class="apply__bann" src="@/assets/sample.png" alt="" />
    <div class="apply__infos-container">
      <div class="apply__heading">
        Nous rejoindre
      </div>
      Le recrutement est actuellement fermé. Toutefois, nous continuons
      d'étudier les nouvelles candidatures et tu seras ajouté sur la liste
      d'attente !
      <AppButton
        :iconR="'arrow-right'"
        :marginTop="10"
        @click="scroll('apply')"
      >
        Postuler
      </AppButton>
    </div>
  </div>
  <!--Apply Form-->
  <div class="apply__form" ref="apply">
    <form class="form" @submit.prevent="submit" method="post">
      <!--À propos de toi-->
      <div class="form__heading">
        <div class="form__title">
          À propos de toi
        </div>
        Nous souhaiterions en savoir plus sur toi !
      </div>
      <div class="form__pannel">
        <!--Name-->
        <FormElement
          v-model="name"
          :label="'Comment t\'appelles-tu ?'"
          :name="'name'"
        ></FormElement>
        <!--Birthday-->
        <FormElement
          v-model="birthday"
          :label="'Quelle est ta date de naissance ?'"
          :name="'birthday'"
          :type="'date'"
          :required="true"
        ></FormElement>
        <!--Discord-->
        <FormElement
          v-model="discord"
          :label="'Quel est ton identifiant Discord ?'"
          :name="'discord'"
          :required="true"
        ></FormElement>
        <!--Mic-->
        <FormElement
          v-model="mic"
          :label="'Possèdes-tu un micro ?'"
          :name="'mic'"
          :type="'mic'"
          :required="true"
        ></FormElement>
        <!--Availability-->
        <FormElement
          v-model="availability"
          :label="'Quand es-tu dispo après 21h ?'"
          :name="'availability'"
          :type="'availability'"
          :required="true"
        ></FormElement>
        <div class="form__empty-field"></div>
        <!--About-->
        <FormElement
          :element="'text'"
          v-model="about"
          :label="'Dis-nous en plus sur toi !'"
          :name="'about'"
          :type="'about'"
          :required="true"
          :large="true"
        ></FormElement>
      </div>
      <div class="form__separator"></div>
      <!--À propos du personnage-->
      <div class="form__heading">
        <div class="form__title">
          À propos de ton personnage
        </div>
        C'est au tour de ton personnage d'avoir la vedette !
      </div>
      <div class="form__pannel">
        <!--First Name-->
        <FormElement
          v-model="firstName"
          :label="'Prénom du personnage'"
          :name="'firstName'"
          :required="true"
        ></FormElement>
        <!--Last Name-->
        <FormElement
          v-model="lastName"
          :label="'Nom du personnage'"
          :name="'lastName'"
          :required="true"
        ></FormElement>
        <!--Jobs Max Lvl-->
        <FormElement
          :inputs="jobs"
          :label="'Quelles sont tes classes au niveau maximum ?'"
          :name="'maxlvl'"
          :type="'checkbox'"
          :large="true"
          @check="handleCheck"
        ></FormElement>
        <!--Main Class-->
        <FormElement
          v-model="mainClass"
          :label="'Quelle est ta classe principale ?'"
          :name="'mainClass'"
          :required="true"
        ></FormElement>
      </div>
      <div class="form__separator"></div>
      <!--Ton rapport au jeu-->
      <div class="form__heading">
        <div class="form__title">
          Ton rapport au jeu
        </div>
        Que fais-tu pendant tes sessions de jeu ?
      </div>
      <!--Playtime-->
      <FormElement
        v-model="playtime"
        :label="'Depuis quand joues-tu à Final Fantasy XIV ?'"
        :name="'playtime'"
        :required="true"
        :large="true"
        :element="'text'"
      ></FormElement>
      <!--Game Activities-->
      <FormElement
        v-model="gameActivities"
        :label="'Quelles sont tes activités préférées dans le jeu ?'"
        :name="'gameActivities'"
        :required="true"
        :large="true"
        :element="'text'"
      ></FormElement>
      <!--CL Wishes-->
      <FormElement
        v-model="cl"
        :label="
          'Quel genre de compagnie libre recherches-tu et pourquoi nous choisir ?'
        "
        :name="'cl'"
        :required="true"
        :large="true"
        :element="'text'"
      ></FormElement>
      <!--Current CL-->
      <FormElement
        v-model="currentCl"
        :label="
          'Fais-tu actuellement partie d\'une compagnie ? Si oui, pourquoi la quitter ?'
        "
        :name="'currentCl'"
        :required="true"
        :large="true"
        :element="'text'"
      ></FormElement>
      <div class="form__separator"></div>
      <!--Ton expérience à haut niveau-->
      <div class="form__heading">
        <div class="form__title">
          Ton expérience à haut niveau
        </div>
        Nous aimerions en savoir plus sur le contenu que tu as fait !
      </div>
      <!--Exp-->
      <FormElement
        v-model="exp"
        :label="
          'Quelle est ton expérience de jeu HL ? Souhaites-tu rejoindre un roster ?'
        "
        :name="'exp'"
        :required="true"
        :large="true"
        :element="'text'"
      ></FormElement>
      <div class="form__separator"></div>
      <!--Choisis ton équipe-->
      <div class="form__heading">
        <div class="form__title">
          Choisis ton équipe
        </div>
        C'est le moment de faire un choix crucial !
      </div>
      <FormElement
        v-model="team"
        :inputs="teams"
        :name="'team'"
        :type="'radio'"
        :large="true"
        :bigLabel="true"
        :teamsLabel="true"
        @check="handleCheck"
      ></FormElement>
    </form>
  </div>
</template>

<script>
import FormElement from "@/components/FormElement.vue";
import AppButton from "@/components/AppButton.vue";

export default {
  name: "Apply",
  data() {
    return {
      name: "",
      birthday: "",
      discord: "",
      mic: "",
      availability: "",
      about: "",
      firstName: "",
      lastName: "",
      maxlvl: [],
      jobs: [
        { name: "Paladin", label: "job-icons/pld" },
        { name: "Guerrier", label: "job-icons/war" },
        { name: "Chevalier noir", label: "job-icons/drk" },
        { name: "Pistosabreur", label: "job-icons/gnb" },
        { name: "Mage blanc", label: "job-icons/whm" },
        { name: "Erudit", label: "job-icons/sch" },
        { name: "Astromancien", label: "job-icons/ast" },
        { name: "Moine", label: "job-icons/mnk" },
        { name: "Chevalier dragon", label: "job-icons/drg" },
        { name: "Ninja", label: "job-icons/nin" },
        { name: "Samouraï", label: "job-icons/sam" },
        { name: "Barde", label: "job-icons/brd" },
        { name: "Machiniste", label: "job-icons/mch" },
        { name: "Danseur", label: "job-icons/dnc" },
        { name: "Mage noir", label: "job-icons/blm" },
        { name: "Invocateur", label: "job-icons/smn" },
        { name: "Mage rouge", label: "job-icons/rdm" }
      ],
      mainClass: "",
      playtime: "",
      gameActivities: "",
      cl: "",
      currentCl: "",
      exp: "",
      team: "",
      teams: [
        { name: "Mog", label: "teams/mog" },
        { name: "Chocobo", label: "teams/chocobo" },
        { name: "Pampa", label: "teams/pampa" },
        { name: "Carbuncle", label: "teams/carbuncle" }
      ]
    };
  },
  components: {
    FormElement,
    AppButton
  },
  methods: {
    scroll(ref) {
      const to = this.$refs[ref];
      const top = to.offsetTop;
      window.scrollTo(0, top);
    },
    handleCheck(e) {
      const name = e.name;
      if (e.checked) {
        this[name].push(e.value);
      } else {
        const index = this[name].indexOf(e.value);
        if (index > -1) {
          this[name].splice(index, 1);
        }
      }
      console.log(this[name]);
    },
    submit() {
      //
    }
  }
};
</script>

<style lang="scss" scoped>
.apply {
  @include flex;
  width: 100%;
  position: relative;
  &__line {
    @include responsive(930) {
      transform: translateY(30px);
    }
    @include absolute-center;
    transform: translateY(60px);
    z-index: -1;
    width: 100%;
    height: 150px;
    background: $namazu;
  }
  &__infos-container {
    @include responsive(930) {
      width: 70%;
      top: 30px;
      right: 0;
    }
    @include responsive(410) {
      width: 90%;
      font-size: $font-small;
    }
    position: relative;
    top: -20px;
    right: 50px;
    z-index: 2;
    width: 40%;
    padding: 50px;
    background: white;
  }
  &__heading {
    @include title;
  }
  &__bann {
    @include responsive(930) {
      display: none;
    }
    display: block;
    position: relative;
    top: 60px;
    left: 50px;
    width: 45%;
    object-fit: cover;
  }
  &__form {
    @include responsive(930) {
      transform: translateY(60px);
    }
    @include flex($justify: space-evenly);
    transform: translateY(120px);
    background: white;
    width: 100%;
    max-width: 1000px;
    margin: auto;
    padding: 50px 0;
  }
  &__pannel {
    width: 100%;
    text-align: center;
  }
}
</style>
