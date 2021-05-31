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
      <div class="form__field">
        <label for="email">Adresse email</label>
        <input type="email" id="email" v-model="email" />
      </div>
      <div class="form__field">
        <label for="password">Mot de passe</label>
        <input type="password" id="password" v-model="password" />
      </div>
      <AppButton :iconR="'plus'">Créer un compte</AppButton>
    </form>
  </AppFullscreen>
</template>

<script>
import AppFullscreen from "@/components/AppFullscreen.vue";
import AppButton from "@/components/AppButton.vue";

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
    AppButton
  },
  methods: {
    submit() {
      //
    }
  }
};
</script>

<style lang="scss" scoped></style>
