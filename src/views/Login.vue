<template lang="html">
  <AppFullscreen>
    <form class="form" @submit.prevent="submit" method="post">
      <div class="form__field">
        <label for="email">Adresse email</label>
        <input type="email" id="email" v-model="email" />
      </div>
      <div class="form__field">
        <label for="password">Mot de passe</label>
        <input type="password" id="password" v-model="password" />
      </div>
      <AppButton :iconR="'sign-in-alt'">Se connecter</AppButton>
    </form>
  </AppFullscreen>
</template>

<script>
import AppFullscreen from "@/components/AppFullscreen.vue";
import AppButton from "@/components/AppButton.vue";

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
