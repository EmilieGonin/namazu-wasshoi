<template lang="html">
  <!--Checkbox Input & Label-->
  <input
    type="checkbox"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script>
export default {
  name: "FormCheckbox",
  props: ["modelValue"],
  emits: ["update:modelValue"]
};
</script>

<style lang="css" scoped></style>
