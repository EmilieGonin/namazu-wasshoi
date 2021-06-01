<template lang="html">
  <!--Checkbox Input & Label-->
  <input
    type="checkbox"
    :value="value"
    :id="value"
    :name="name"
    :required="required"
    @input="$emit('handleCheck', $event.target)"
  />
  <label :for="value">
    <img
      class="form__checkbox-label"
      :src="require('../assets/' + label + '.png')"
      alt=""
    />
  </label>
</template>

<script>
export default {
  name: "FormCheckbox",
  emits: ["handleCheck"],
  props: {
    modelValue: Array,
    value: String,
    name: String,
    label: String,
    required: {
      type: Boolean,
      default: null
    }
  },
  required: {
    type: Boolean,
    default: null
  }
};
</script>

<style lang="css" scoped></style>
