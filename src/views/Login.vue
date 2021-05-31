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
      <FormInput
        :value="email"
        :label="'Adresse email'"
        :name="'email'"
        :type="'email'"
        :required="true"
        @handle-change="handleChange($event)"
      ></FormInput>
      <FormInput
        :value="password"
        :label="'Mot de passe'"
        :name="'password'"
        :type="'password'"
        :required="true"
        @handle-change="handleChange($event)"
      ></FormInput>
      <AppButton :iconR="'sign-in-alt'">Se connecter</AppButton>
    </form>
  </AppFullscreen>
</template>

<script>
import AppFullscreen from "@/components/AppFullscreen.vue";
import AppButton from "@/components/AppButton.vue";
import FormInput from "@/components/FormInput.vue";

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
    FormInput
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
