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
        v-model="email"
        :label="'Adresse email'"
        :name="'email'"
        :type="'email'"
        :required="true"
      ></FormElement>
      <FormElement
        v-model="password"
        :label="'Mot de passe'"
        :name="'password'"
        :type="'password'"
        :required="true"
      ></FormElement>
      <FormElement
        v-model="firstName"
        :label="'Prénom du personnage'"
        :name="'firstName'"
        :required="true"
      ></FormElement>
      <FormElement
        v-model="lastName"
        :label="'Nom du personnage'"
        :name="'lastName'"
        :required="true"
      ></FormElement>
      <FormElement
        v-model="discord"
        :label="'Pseudo Discord'"
        :name="'discord'"
        :required="true"
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
    submit() {
      //
    }
  }
};
</script>

<style lang="scss" scoped></style>
