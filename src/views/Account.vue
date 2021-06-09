<template lang="html">
  <form class="account form" @submit.prevent="submit" method="post">
    <div class="account__heading">
      <span class="account__title">Modifier les données personnelles</span>
      <div class="account__line"></div>
    </div>
    <div class="form__panel">
      <FormElement
        v-model="email"
        :label="'Adresse email'"
        :name="'email'"
        :type="'email'"
      ></FormElement>
      <FormElement
        v-model="password"
        :label="'Mot de passe'"
        :name="'password'"
        :type="'password'"
      ></FormElement>
    </div>
    <div class="account__heading">
      <span class="account__title">Modifier le profil</span>
      <div class="account__line"></div>
    </div>
    <FormElement
      v-model="bio"
      :label="'Biographie'"
      :name="'bio'"
      :element="'text'"
      :large="true"
    ></FormElement>
    <AppButton :iconR="'arrow-right'">Mettre à jour</AppButton>
    <div class="account__heading">
      <span class="account__title">Modifier la Wassho'Liste</span>
      <div class="account__line"></div>
    </div>
    <AppButton :iconR="'arrow-right'">Mettre à jour</AppButton>
  </form>
</template>

<script>
import FormElement from "@/components/FormElement.vue";
import AppButton from "@/components/AppButton.vue";

export default {
  name: "Account",
  data() {
    return {
      email: "",
      password: "",
      bio: ""
    };
  },
  components: {
    FormElement,
    AppButton
  },
  props: {
    //
  },
  methods: {
    submit() {
      //
    }
  }
};
</script>

<style lang="scss" scoped>
.account {
  justify-content: flex-start;
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
