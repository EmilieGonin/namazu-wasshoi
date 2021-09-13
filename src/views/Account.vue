<template lang="html">
  <div class="account">
    <form
      class="form"
      @submit.prevent="submit"
      @keyup.enter="submit"
      method="post"
    >
      <div class="account__heading">
        <span class="account__title">Modifier les données personnelles</span>
        <div class="account__line"></div>
      </div>
      <div class="form__panel">
        <FormElement
          v-model="formo_email"
          :label="'Adresse email'"
          :name="'formo_email'"
          :type="'email'"
          :disabled="emailDisabled"
          @allow-edit="emailDisabled = false"
        ></FormElement>
        <FormElement
          v-model="formo_password"
          :label="'Mot de passe'"
          :name="'formo_password'"
          :type="'password'"
          :disabled="passwordDisabled"
          @allow-edit="passwordDisabled = false"
        ></FormElement>
      </div>
      <div class="account__heading">
        <span class="account__title">Modifier le profil</span>
        <div class="account__line"></div>
      </div>
      <div class="form__panel">
        <!--Birthday-->
        <FormElement
          v-model="formo_birthday"
          :label="'Date de naissance'"
          :name="'formo_birthday'"
          :type="'date'"
        ></FormElement>
        <!--Discord-->
        <FormElement
          v-model="formo_discord"
          :label="'Identifiant Discord'"
          :name="'formo_discord'"
        ></FormElement>
      </div>
      <FormElement
        v-model="formo_bio"
        :label="'Biographie'"
        :name="'formo_bio'"
        :type="'textarea'"
        :large="true"
      ></FormElement>
      <AppButton :iconR="'arrow-right'" @click="submit"
        >Mettre à jour</AppButton
      >
    </form>
    <!-- <div class="account__heading">
      <span class="account__title">Modifier la Wassho'Liste</span>
      <div class="account__line"></div>
    </div>
    <WasshoListe :edit="true"></WasshoListe> -->
  </div>
</template>

<script>
import { useMeta } from "vue-meta";
import { formValidate } from "@/mixins.js";
import FormElement from "@/components/FormElement.vue";
import AppButton from "@/components/AppButton.vue";
// import WasshoListe from "@/components/WasshoListe.vue";

export default {
  name: "Account",
  setup() {
    useMeta({
      title: "Paramètres du compte"
    });
  },
  data() {
    return {
      formo_email: this.$store.state.users.user.email,
      formo_password: "",
      formo_birthday: this.$store.state.users.user.birthday,
      formo_discord: this.$store.state.users.user.discord,
      formo_bio: this.$store.state.users.user.bio,
      emailDisabled: true,
      passwordDisabled: true
    };
  },
  components: {
    FormElement,
    AppButton
    // WasshoListe
  },
  props: {
    //
  },
  mixins: [formValidate],
  methods: {
    submit() {
      try {
        const form = this.formValidate();

        this.$store
          .dispatch("editUser", [this.$store.state.users.user.id, form])
          .then(() => {
            this.passwordDisabled = true;
            this.emailDisabled = true;
          });
      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.account {
  @include flex($direction: column, $gap: 20);
  margin: 15px 0;
  &__heading {
    @include title;
    position: relative;
    width: 100%;
    max-width: 800px;
    margin: 5px auto;
    text-align: center;
  }
  &__title {
    background: $minor-white;
    padding: 5px;
  }
  &__line {
    @include absolute-center;
    z-index: -1;
    content: "";
    background: $namazu;
    width: 100%;
    height: 5px;
  }
}
</style>
