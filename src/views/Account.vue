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
      <!--Avatar-->
      <FormElement
        v-model="file"
        :label="'Avatar'"
        :name="'file'"
        :type="'file'"
        :hasFile="hasFile"
        @upload="getFile"
      ></FormElement>
      <div class="form__panel">
        <!--Birthday-->
        <FormElement
          v-model="formo_birthday_Profile"
          :label="'Date de naissance'"
          :name="'formo_birthday_Profile'"
          :type="'date'"
        ></FormElement>
        <!--Discord-->
        <FormElement
          v-model="formo_discord_Profile"
          :label="'Identifiant Discord'"
          :name="'formo_discord_Profile'"
        ></FormElement>
      </div>
      <FormElement
        v-model="formo_bio_Profile"
        :label="'Biographie'"
        :name="'formo_bio_Profile'"
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
      file: "",
      deleteFile: false,
      hasFile: this.$store.state.users.user.Profile.avatar,
      formo_file: "",
      formo_email: this.$store.state.users.user.email,
      formo_password: "",
      formo_birthday_Profile: this.$store.state.users.user.Profile.birthday,
      formo_discord_Profile: this.$store.state.users.user.Profile.discord,
      formo_bio_Profile: this.$store.state.users.user.Profile.bio,
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
        let form = this.formValidate();

        if (this.deleteFile) {
          form.deleteFile = true;
        }

        if (this.file) {
          const formData = new FormData();

          formData.append("file", this.formo_file);
          formData.append("user", JSON.stringify(form));
          form = formData;
        }

        this.$store
          .dispatch("editUser", [this.$store.state.users.user.id, form])
          .then(() => {
            this.passwordDisabled = true;
            this.emailDisabled = true;
          });
      } catch (e) {
        console.error(e);
      }
    },
    getFile(file) {
      this.deleteFile = false;
      this.formo_file = file;

      if (!file) {
        this.deleteFile = true;
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
