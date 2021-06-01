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
    </div>
  </div>
  <!--Apply Form-->
  <div class="apply__form">
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
    </form>
  </div>
</template>

<script>
import FormElement from "@/components/FormElement.vue";

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
        { name: "Paladin", label: "apply/pld" },
        { name: "Guerrier", label: "apply/war" },
        { name: "Chevalier noir", label: "apply/drk" },
        { name: "Pistosabreur", label: "apply/gnb" },
        { name: "Mage blanc", label: "apply/whm" },
        { name: "Erudit", label: "apply/sch" },
        { name: "Astromancien", label: "apply/ast" },
        { name: "Moine", label: "apply/mnk" },
        { name: "Chevalier dragon", label: "apply/drg" },
        { name: "Ninja", label: "apply/nin" },
        { name: "Samouraï", label: "apply/sam" },
        { name: "Barde", label: "apply/brd" },
        { name: "Machiniste", label: "apply/mch" },
        { name: "Danseur", label: "apply/dnc" },
        { name: "Mage noir", label: "apply/blm" },
        { name: "Invocateur", label: "apply/smn" },
        { name: "Mage rouge", label: "apply/rdm" }
      ],
      mainClass: ""
    };
  },
  components: {
    FormElement
  },
  methods: {
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
    @include absolute-center;
    transform: translateY(60px);
    z-index: -1;
    width: 100%;
    height: 150px;
    background: $namazu;
  }
  &__infos-container {
    position: relative;
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
    display: block;
    position: relative;
    top: 60px;
    left: 50px;
    width: 45%;
    object-fit: cover;
  }
  &__form {
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
