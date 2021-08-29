<template lang="html">
  <div class="submit">
    <form
      class="form"
      @submit.prevent="submit"
      @keyup.enter="submit"
      method="post"
    >
      <FormElement
        v-model="file"
        :label="'Choisissez votre screenshot'"
        :name="'file'"
        :type="'file'"
        :required="true"
        @upload="getFile"
      ></FormElement>

      <FormElement
        v-model="form_description"
        :label="'Décrivez votre participation'"
        :name="'form_description'"
        :type="'textarea'"
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
  props: {
    festival: [String, Number]
  },
  data() {
    return {
      file: "",
      form_file: "",
      form_description: ""
    };
  },
  mixins: [formValidate],
  methods: {
    submit() {
      try {
        const form = this.formValidate();
        const formData = new FormData();

        formData.append("file", this.form_file);
        formData.append("description", form.description);
        formData.append("FestivalId", this.festival);
        this.$store.dispatch("submitScreenshot", formData).catch(e => {
          console.error(e);
        });
      } catch (e) {
        console.error(e);
      }
    },
    getFile(file) {
      this.form_file = file;
    }
  }
};
</script>

<style lang="scss" scoped>
.submit {
  @include responsive(1024) {
    padding: 20px;
  }
  border-radius: 25px;
  border: 3px dashed $namazu;
  padding: 50px;
}
</style>
