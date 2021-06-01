<template lang="html">
  <!--Checkbox Input & Label-->
  <label :for="name">
    <img
      class="form__checkbox-label"
      :src="require('../assets/' + label + '.png')"
      alt=""
    />
  </label>
  <input
    type="checkbox"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script>
export default {
  name: "FormCheckbox",
  props: ["modelValue", "name", "label"],
  emits: ["update:modelValue"]
};
</script>

<style lang="css" scoped></style>
