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
        v-model="form_discord"
        :label="'Pseudo Discord'"
        :name="'form_discord'"
        :required="true"
      ></FormElement>
      <FormElement
        v-model="form_character_cl"
        :label="'Nom du personnage'"
        :name="'form_character_cl'"
        :required="true"
        :wait="true"
      ></FormElement>
      <FormElement
        v-model="form_email"
        :label="'Adresse email'"
        :name="'form_email'"
        :type="'email'"
        :required="true"
      ></FormElement>
      <FormElement
        v-model="form_password"
        :label="'Mot de passe'"
        :name="'form_password'"
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
      form_email: "",
      form_password: "",
      form_character_cl: "",
      form_discord: ""
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
          const error =
            "Veuillez renseigner tous les champs requis du formulaire.";
          this.$store.dispatch("error", error);
          throw error;
        }

        const character = this.character.split(" ").join("+");
        const cl = true;
        const silent = false;

        this.$store
          .dispatch("searchCharacter", [character, cl, silent])
          .then(() => {
            this.$store
              .dispatch("signup", user)
              .then(() => this.$router.push("/"))
              .catch(() =>
                console.error(
                  "Une erreur s'est produite pendant l'inscription."
                )
              );
          })
          .catch(() => {
            console.error("Personnage non trouvé.");
          });
      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
