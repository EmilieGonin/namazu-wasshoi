<template lang="html">
  <AppFullscreen>
    <form
      class="form"
      @submit.prevent="submit"
      @keyup.enter="submit"
      method="post"
    >
      <div class="form__heading">
        <div class="form__title">
          Bienvenue parmi nous !
        </div>
        L'inscription est réservée aux membres de Namazu Wasshoi.
        <router-link to="/apply">Postulez dès maintenant !</router-link>
      </div>
      <FormElement
        v-model="form_discord_Profile"
        :label="'Pseudo Discord'"
        :name="'form_discord_Profile'"
        :required="true"
      ></FormElement>
      <FormElement
        v-model="form_name_Character_cl"
        :label="'Nom du personnage'"
        :name="'form_name_Character_cl'"
        :required="true"
        :wait="true"
      ></FormElement>
      <FormElement
        v-model="form_team"
        :inputs="teams"
        :label="'Equipe d\'évent'"
        :labelSelect="'Sélectionnez une équipe'"
        :name="'form_team'"
        :type="'select'"
        :required="true"
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
import { useMeta } from "vue-meta";
import { formValidate } from "@/mixins.js";
import AppFullscreen from "@/components/AppFullscreen.vue";
import AppButton from "@/components/AppButton.vue";
import FormElement from "@/components/FormElement.vue";

export default {
  name: "Signup",
  components: {
    AppFullscreen,
    AppButton,
    FormElement
  },
  setup() {
    useMeta({
      title: "Créer un compte"
    });
  },
  data() {
    return {
      form_email: "",
      form_password: "",
      form_name_Character_cl: "",
      formo_lodestoneId_Character: "",
      form_discord_Profile: "",
      form_team: "",
      //temp
      teams: [
        { name: "Mog" },
        { name: "Chocobo" },
        { name: "Pampa" },
        { name: "Carbuncle" }
      ]
    };
  },
  mixins: [formValidate],
  methods: {
    submit() {
      try {
        this.formValidateRequired();
        const character = this.form_name_Character_cl.split(" ").join("+");

        this.$store
          .dispatch("searchCharacter", [character, true, false])
          .then(character => {
            this.form_name_Character_cl = character.Name;
            this.formo_lodestoneId_Character = character.ID;

            const form = this.formValidate();
            this.$store
              .dispatch("signup", form)
              .then(() => this.$router.push("/"))
              .catch(e => console.error(e));
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
