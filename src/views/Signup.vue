<template lang="html">
  <AppFullscreen>
    <form class="form" @submit.prevent="submit" method="post">
      <div class="form__heading">
        <div class="form__title">
          Bienvenue parmi nous !
        </div>
        Vous avez déjà créé votre compte ?
        <router-link to="/login">Connectez-vous !</router-link>
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
      <AppButton :iconR="'plus'">Créer un compte</AppButton>
    </form>
  </AppFullscreen>
</template>

<script>
import AppFullscreen from "@/components/AppFullscreen.vue";
import AppButton from "@/components/AppButton.vue";
import FormInput from "@/components/FormInput.vue";

export default {
  name: "Signup",
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
