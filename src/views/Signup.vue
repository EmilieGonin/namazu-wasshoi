<template lang="html">
  <AppFullscreen>
    <form class="form" @submit.prevent="submit" method="post">
      <div class="form__heading">
        <div class="form__title">
          Bienvenue parmi nous !
        </div>
        Vous ne faites pas partie de la compagnie ?
        <router-link to="/apply">Postulez dès maintenant !</router-link>
      </div>
      <FormElement
        :value="email"
        :label="'Adresse email'"
        :name="'email'"
        :type="'email'"
        :required="true"
        @handle-change="handleChange($event)"
      ></FormElement>
      <FormElement
        :value="password"
        :label="'Mot de passe'"
        :name="'password'"
        :type="'password'"
        :required="true"
        @handle-change="handleChange($event)"
      ></FormElement>
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
      <FormElement
        :value="discord"
        :label="'Pseudo Discord'"
        :name="'discord'"
        :required="true"
        @handle-change="handleChange($event)"
      ></FormElement>
      <AppButton :iconR="'plus'">Créer un compte</AppButton>
    </form>
  </AppFullscreen>
</template>

<script>
import AppFullscreen from "@/components/AppFullscreen.vue";
import AppButton from "@/components/AppButton.vue";
import FormElement from "@/components/FormElement.vue";

export default {
  name: "Signup",
  data() {
    return {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      discord: ""
    };
  },
  components: {
    AppFullscreen,
    AppButton,
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

<style lang="scss" scoped></style>
