<template lang="html">
  <div class="form__field">
    <label :for="name">{{ label }}</label>
    <input
      :value="value"
      :id="name"
      :type="type"
      @input="$emit('handleChange', [$event.target.value, $event.target.id])"
    />
    <font-awesome-icon class="icon" icon="bars" fixed-width />
  </div>
</template>

<script>
export default {
  name: "FormInput",
  props: {
    value: String,
    name: String,
    label: String,
    type: {
      type: String,
      default: "text"
    }
  }
};
</script>

<style lang="scss" scoped></style>
