<template lang="html">
  <div class="submit">
    <form
      class="form"
      @submit.prevent="submit"
      @keyup.enter="submit"
      method="post"
    >
      <FormElement
        v-model="form_file"
        :label="'Choisissez votre screenshot'"
        :name="'form_file'"
        :type="'file'"
        :required="true"
      ></FormElement>
      <AppButton @click="submit">Valider la participation</AppButton>
    </form>
  </div>
</template>

<script>
import { formValidate } from "@/mixins.js";
import FormElement from "@/components/FormElement.vue";
import AppButton from "@/components/AppButton.vue";

export default {
  name: "FestivalSubmit",
  components: {
    FormElement,
    AppButton
  },
  data() {
    return {
      form_file: ""
    };
  },
  mixins: [formValidate],
  methods: {
    submit() {
      try {
        const form = this.formValidate();
        console.log(form);
        // this.$store.dispatch("submitScreenshot", form).catch(e => {
        //   console.error(e);
        // });
      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.submit {
  border-radius: 25px;
  border: 3px dashed $namazu;
  padding: 50px;
}
</style>
