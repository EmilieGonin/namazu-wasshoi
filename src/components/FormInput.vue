<template lang="html">
  <div class="form__field">
    <label :for="name">{{ label }}</label>
    <div class="form__input-container">
      <input
        :value="value"
        :id="name"
        :type="type"
        :required="required"
        @focus="setIcon"
        @input="
          $emit('handleChange', [$event.target.value, $event.target.id]),
            setIcon($event)
        "
      />
      <font-awesome-icon
        class="form__icon"
        :class="{ 'form__icon--valid': valid }"
        v-if="icon"
        :icon="icon"
        fixed-width
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "FormInput",
  data() {
    return {
      icon: "",
      valid: false
    };
  },
  props: {
    value: String,
    name: String,
    label: String,
    type: {
      type: String,
      default: "text"
    },
    required: {
      type: Boolean,
      default: null
    }
  },
  methods: {
    setIcon(e) {
      if (e.target.checkValidity()) {
        this.icon = "check-circle";
        this.valid = true;
      } else {
        this.icon = "times-circle";
        this.valid = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
