<template lang="html">
  <div class="wassholiste-element">
    {{ name }}
    <span v-for="input in inputs" :key="input.name">
      <input
        type="checkbox"
        v-model="checked"
        :value="input.name"
        :id="input.name"
        :name="name"
        @change="$emit('check', $event.target)"
      />
      <label :for="input.name">{{ input.name }}</label>
    </span>
  </div>
</template>

<script>
export default {
  name: "WasshoListeElement",
  data() {
    return {
      checked: []
    };
  },
  props: {
    inputs: Array,
    name: String
  }
};
</script>

<style lang="scss" scoped>
.wassholiste-element {
  @include flex($direction: column, $align: flex-start);
}
</style>
