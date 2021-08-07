<template lang="html">
  <AppFullscreen>
    <form class="form" @submit.prevent="submit" method="post">
      <div class="form__heading">
        <div class="form__title">
          Bienvenue parmi nous !
        </div>
        L'inscription est réservée aux membres de Namazu Wasshoi.
        <router-link to="/apply">Postulez dès maintenant !</router-link>
      </div>
      <FormElement
        v-model="discord"
        :label="'Pseudo Discord'"
        :name="'discord'"
        :required="true"
      ></FormElement>
      <FormElement
        v-model="character"
        :label="'Nom du personnage'"
        :name="'character'"
        :required="true"
        :wait="true"
      ></FormElement>
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
      <AppButton :iconR="'plus'" @click="submit">Créer un compte</AppButton>
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
      character: "",
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
      try {
        const user = {
          email: this.email,
          password: this.password,
          character: this.character,
          discord: this.discord
        };
        if (!this.email || !this.password || !this.character || !this.discord) {
          const error = "Veuillez renseigner tous les champs du formulaire.";
          this.$store.dispatch("error", error);
          throw error;
        }
        this.$store
          .dispatch("signup", user)
          .then(() => this.$router.push("/"))
          .catch(() =>
            console.error("Une erreur s'est produite pendant l'inscription.")
          );
      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
