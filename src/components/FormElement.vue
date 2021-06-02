<template lang="html">
  <!--Checkbox Field-->
  <div
    class="form__field"
    :class="{ 'form__field--large': large }"
    v-if="type == 'checkbox' || type == 'radio'"
  >
    <!--Field Label-->
    <label class="form__label form__label--only" :for="name" v-if="label">
      {{ label }}
    </label>
    <!--Checkbox Inputs-->
    <div
      class="form__checkbox-container"
      :class="{
        'form__checkbox-container--box': !bigLabel
      }"
      v-if="type == 'checkbox'"
    >
      <span v-for="(input, index) in inputs" :key="input.name">
        <input
          type="checkbox"
          v-model="checked"
          :value="input.name"
          :id="input.name"
          :name="name"
          :class="{ 'form__checkbox-input': input.label }"
          @change="$emit('check', $event.target)"
        />
        <label :for="input.name">
          <img
            class="form__checkbox-label"
            :class="{
              'form__checkbox-label--big': bigLabel,
              ['form__checkbox-label--' + (index + 1)]: teamsLabel
            }"
            :src="require('../assets/' + input.label + '.png')"
            :alt="input.name"
            :title="input.name"
          />
        </label>
      </span>
    </div>
    <!--Radio Inputs-->
    <div
      class="form__checkbox-container"
      :class="{ 'form__checkbox-container--box': !bigLabel }"
      v-if="type == 'radio'"
    >
      <span v-for="(input, index) in inputs" :key="input.name">
        <input
          type="radio"
          :value="input.name"
          :id="input.name"
          :name="name"
          :class="{ 'form__checkbox-input': input.label }"
          @change="$emit('update:modelValue', $event.target.value)"
        />
        <label :for="input.name">
          <img
            class="form__checkbox-label"
            :class="{
              'form__checkbox-label--big': bigLabel,
              ['form__checkbox-label--' + (index + 1)]: teamsLabel
            }"
            :src="require('../assets/' + input.label + '.png')"
            :alt="input.name"
            :title="input.name"
            v-if="input.label"
          />
          <span v-else>{{ input.name }}</span>
        </label>
      </span>
    </div>
  </div>
  <!--Other Fields-->
  <div class="form__field" :class="{ 'form__field--large': large }" v-else>
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
      <!--Label-->
      <label class="form__label" :for="name">
        {{ label }}
      </label>
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
    },
    bigLabel: {
      type: Boolean,
      default: false
    },
    teamsLabel: {
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

<style lang="scss">
.form {
  @include flex($direction: column, $gap: 25);
  width: 100%;
  &__pannel {
    @include flex($gap: 25);
    flex-wrap: wrap;
    width: 100%;
  }
  &__heading {
    text-align: center;
    margin-bottom: 10px;
    font-size: $font-small;
  }
  &__title {
    font-family: "Bebas Neue", cursive;
    font-weight: normal;
    font-size: 35px;
    line-height: 30px;
  }
  &__icon {
    position: absolute;
    right: 5px;
    bottom: 9px;
    color: veil($namazu);
    &--valid {
      color: $valid;
    }
  }
  &__field {
    @include flex($direction: column);
    width: 80%;
    max-width: 320px;
    &--large {
      max-width: 665px;
    }
  }
  &__empty-field {
    @include responsive(664) {
      display: none;
    }
    width: 80%;
    height: 1px;
    max-width: 320px;
  }
  &__input-container {
    @include flex($direction: column-reverse);
    position: relative;
    width: 100%;
  }
  &__separator {
    height: 10px;
  }
  &__label {
    display: block;
    padding: 5px;
    width: 70%;
    text-align: center;
    background: $namazu;
    color: $minor-white;
    font-size: $font-small;
    &--only {
      max-width: 465px;
    }
  }
  &__checkbox-container {
    @include flex;
    flex-wrap: wrap;
    width: 100%;
    padding: 5px;
    &--box {
      border: 2px solid $grey;
      border-top: 2px solid $namazu;
      background: veil($minor-white);
    }
  }
  &__checkbox-label {
    cursor: pointer;
    display: block;
    width: 35px;
    height: 35px;
    opacity: 0.5;
    object-fit: cover;
    &--big {
      width: 150px;
      height: 150px;
    }
    &:hover {
      opacity: 1;
    }

    @each $team, $color in $teams {
      $i: index(($teams), ($team $color));
      &--#{$i} {
        border: 5px solid $color;
        margin: 5px;
        box-shadow: 0 0 3px $main-black;
      }
    }
  }
  &__checkbox-input {
    display: none;
    &:checked + label img {
      opacity: 1;
    }
  }

  //Form elements
  input,
  textarea {
    width: 100%;
    padding: 0 5px;
    padding-right: 25px;
    outline: none;
    border: 2px solid $grey;
    border-top: 2px solid $namazu;
    background: veil($minor-white);
    &:focus {
      //
    }
  }
  textarea {
    padding: 5px;
  }
  input {
    min-height: 34px;
  }
  input[type="checkbox"],
  input[type="radio"] {
    margin: 0 5px 0 15px;
    min-height: auto;
    width: auto;
  }
  input:required + label::after,
  textarea:required + label::after {
    content: " *";
    position: absolute;
    top: 27px;
    right: -10px;
    // right: 0;
    color: $namazu;
  }
}
</style>
