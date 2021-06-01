<template lang="html">
  <!--Label Only-->
  <label class="form__label form__label--only" :for="name" v-if="labelOnly">
    {{ label }}
  </label>
  <!--Field-->
  <div class="form__field" :class="{ 'form__field--large': large }" v-else>
    <!--Label-->
    <label class="form__label" :for="name">
      {{ label }}
    </label>
    <!--Input-->
    <div class="form__input-container">
      <input
        :value="modelValue"
        :id="name"
        :type="type"
        :required="required"
        v-if="element == 'input'"
        @focus="setIcon($event)"
        @input="
          $emit('update:modelValue', $event.target.value), setIcon($event)
        "
      />
      <!--Textarea-->
      <textarea
        :value="modelValue"
        :id="name"
        :required="required"
        rows="8"
        cols="80"
        v-if="element == 'text'"
      ></textarea>
      <!--Input Icon-->
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
  name: "FormElement",
  data() {
    return {
      icon: "",
      valid: false
    };
  },
  emits: ["update:modelValue"],
  props: {
    //Element datas
    modelValue: [String, Array],
    name: String,
    label: String,
    required: {
      type: Boolean,
      default: null
    },
    //Element tag
    element: {
      type: String,
      default: "input"
    },
    //Element type
    type: {
      type: String,
      default: "text"
    },
    //Element design
    labelOnly: {
      type: Boolean,
      default: false
    },
    large: {
      type: Boolean,
      default: false
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
