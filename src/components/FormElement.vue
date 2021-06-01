<template lang="html">
  <!--Checkbox Field-->
  <div
    class="form__field"
    :class="{ 'form__field--large': large }"
    v-if="type == 'checkbox'"
  >
    <!--Field Label-->
    <label class="form__label form__label--only" :for="name">
      {{ label }}
    </label>
    <!--Checkbox Inputs-->
    <div class="form__checkbox-container">
      <span v-for="input in inputs" :key="input.name">
        <input
          type="checkbox"
          v-model="checked"
          :value="input.name"
          :id="input.name"
          :name="name"
          @change="$emit('check', $event.target)"
        />
        <label :for="input.name">
          <img
            class="form__checkbox-label"
            :src="require('../assets/' + input.label + '.png')"
            :alt="input.name"
            :title="input.name"
          />
        </label>
      </span>
    </div>
  </div>
  <!--Other Fields-->
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
      valid: false,
      checked: []
    };
  },
  emits: ["update:modelValue", "check"],
  props: {
    //Element datas
    modelValue: [String, Array],
    name: String,
    label: String,
    required: {
      type: Boolean,
      default: null
    },
    inputs: Array,
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
