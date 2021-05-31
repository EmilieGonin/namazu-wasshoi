<template lang="html">
  <!--Checkbox Input & Label-->
  <input
    :value="value"
    :id="name"
    :type="type"
    :required="required"
    v-if="type == 'checkbox'"
    @focus="setIcon"
    @input="
      $emit('checkbox', [$event.target.checked, $event.target.id]),
        setIcon($event)
    "
  />
  <label :for="name" v-if="type == 'checkbox'">
    <img
      class="form__checkbox-label"
      :src="require('../assets/' + label + '.png')"
      alt=""
      v-if="type == 'checkbox'"
    />
  </label>
</template>

<script>
export default {};
</script>

<style lang="css" scoped></style>
