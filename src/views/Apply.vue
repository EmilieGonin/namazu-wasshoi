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
  <div class="apply__form">
    <form class="form" @submit.prevent="submit" method="post">
      <div class="form__heading">
        <div class="form__title">
          À propos de toi
        </div>
        Nous souhaiterions en savoir plus sur toi !
      </div>
      <div class="form__pannel">
        <FormElement
          :value="name"
          :label="'Comment t\'appelles-tu ?'"
          :name="'name'"
          @handle-change="handleChange($event)"
        ></FormElement>
        <FormElement
          :value="birthday"
          :label="'Quelle est ta date de naissance ?'"
          :name="'birthday'"
          :type="'date'"
          :required="true"
          @handle-change="handleChange($event)"
        ></FormElement>
        <FormElement
          :value="discord"
          :label="'Quel est ton identifiant Discord ?'"
          :name="'discord'"
          :required="true"
          @handle-change="handleChange($event)"
        ></FormElement>
        <FormElement
          :value="mic"
          :label="'Possèdes-tu un micro ?'"
          :name="'mic'"
          :type="'mic'"
          :required="true"
          @handle-change="handleChange($event)"
        ></FormElement>
        <FormElement
          :value="availability"
          :label="'Quand es-tu dispo après 21h ?'"
          :name="'availability'"
          :type="'availability'"
          :required="true"
          @handle-change="handleChange($event)"
        ></FormElement>
        <div class="form__empty-field"></div>
        <FormElement
          :element="'text'"
          :value="about"
          :label="'Dis-nous en plus sur toi !'"
          :name="'about'"
          :type="'about'"
          :required="true"
          :large="true"
          @handle-change="handleChange($event)"
        ></FormElement>
      </div>
      <div class="form__separator"></div>
      <div class="form__heading">
        <div class="form__title">
          À propos de ton personnage
        </div>
        C'est au tour de ton personnage d'avoir la vedette !
      </div>
      <div class="form__pannel">
        <FormElement
          :value="firstName"
          :label="'Prénom du personnage'"
          :name="'firstName'"
          :required="true"
          @handle-change="handleChange($event)"
        ></FormElement>
        <FormElement
          :value="lastName"
          :label="'Nom du personnage'"
          :name="'lastName'"
          :required="true"
          @handle-change="handleChange($event)"
        ></FormElement>
        <!--<FormElement
          :labelOnly="true"
          :label="'Quelles sont tes classes au niveau maximum ?'"
          :name="'maxlvl'"
          :large="true"
        ></FormElement>
        <div class="form__checkbox">
          <FormElement
            :value="maxlvl"
            :label="job.icon"
            :name="job.name"
            :type="'checkbox'"
            :required="true"
            :key="job.index"
            v-for="job in jobs"
            @checkbox="checkbox($event)"
          ></FormElement>
        </div>-->
        <FormElement
          :value="mainClass"
          :label="'Quelle est ta classe principale ?'"
          :name="'mainClass'"
          :required="true"
          @handle-change="handleChange($event)"
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
        { name: "gnb", icon: "emote" },
        { name: "pld", icon: "emote" }
      ],
      mainClass: ""
    };
  },
  components: {
    FormElement
  },
  methods: {
    handleChange([value, name]) {
      this[name] = value;
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
