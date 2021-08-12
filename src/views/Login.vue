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
          Bon retour parmi nous !
        </div>
        Vous n'avez pas encore de compte ?
        <router-link to="/signup">Inscrivez-vous !</router-link>
      </div>
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
      <AppButton :iconR="'sign-in-alt'" @click="submit">Se connecter</AppButton>
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
  name: "Login",
  setup() {
    useMeta({
      title: "Se connecter"
    });
  },
  data() {
    return {
      form_email: "",
      form_password: ""
    };
  },
  components: {
    AppFullscreen,
    AppButton,
    FormElement
  },
  mixins: [formValidate],
  methods: {
    submit() {
      try {
        const form = this.formValidate();
        this.$store
          .dispatch("login", form)
          .then(() => this.$router.push("/"))
          .catch(e => {
            console.error(e);
          });
      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
