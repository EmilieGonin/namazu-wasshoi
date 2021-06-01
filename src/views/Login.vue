<template lang="html">
  <AppFullscreen>
    <form class="form" @submit.prevent="submit" method="post">
      <div class="form__heading">
        <div class="form__title">
          Bon retour parmi nous !
        </div>
        Vous n'avez pas encore de compte ?
        <router-link to="/signup">Inscrivez-vous !</router-link>
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
      <AppButton :iconR="'sign-in-alt'">Se connecter</AppButton>
    </form>
  </AppFullscreen>
</template>

<script>
import AppFullscreen from "@/components/AppFullscreen.vue";
import AppButton from "@/components/AppButton.vue";
import FormElement from "@/components/FormElement.vue";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: ""
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
