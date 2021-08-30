<template lang="html">
  <div class="festival">
    <form
      class="form"
      @submit.prevent="submit"
      @keyup.enter="submit"
      method="post"
    >
      <FormElement
        v-model="form_theme"
        :label="'Theme'"
        :name="'form_theme'"
        :required="true"
      ></FormElement>
      <AppButton :iconR="'plus'" @click="submit">Créer</AppButton>
    </form>
  </div>
</template>

<script>
import AppButton from "@/components/AppButton.vue";
import FormElement from "@/components/FormElement.vue";

export default {
  name: "AdminPanelFestival",
  components: {
    AppButton,
    FormElement
  },
  data() {
    return {
      form_theme: ""
    };
  },
  methods: {
    //
  }
};
</script>

<style lang="scss" scoped>
.festival {
  @include flex($direction: column);
  width: 100%;
  max-width: 1200px;
  // padding: 5px;
  margin: auto;
}
</style>
