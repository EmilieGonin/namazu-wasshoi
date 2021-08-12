<template lang="html">
  <!--Checkbox, Radio & Select Field-->
  <div
    class="form__field"
    :class="{ 'form__field--large': large }"
    v-if="type == 'checkbox' || type == 'radio' || type == 'select'"
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
          :value="input.value ? input.value : input.name"
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
    <!--Select Inputs-->
    <select
      class="form__checkbox-container"
      :class="{ 'form__select-disabled': !modelValue }"
      :name="name"
      :id="name"
      @change="$emit('update:modelValue', $event.target.value)"
      v-if="type == 'select'"
    >
      <option disabled selected value="" v-if="labelSelect">{{
        labelSelect
      }}</option>
      <option
        class="form__option"
        v-for="input in inputs"
        :key="input.name"
        :value="input.value ? input.value : input.name"
      >
        {{ input.name }}
      </option>
    </select>
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
        @keyup="
          name.includes('character') ? searchCharacter($event.target) : ''
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
        @input="
          $emit('update:modelValue', $event.target.value), setIcon($event)
        "
      ></textarea>
      <!--Label-->
      <label class="form__label" :for="name">
        {{ label }}
      </label>
      <!--Input Icon-->
      <font-awesome-icon
        class="form__icon"
        :class="{
          'form__icon--valid': status == 'valid',
          'form__icon--invalid': status == 'invalid',
          'fa-spin': icon == 'spinner-third'
        }"
        v-if="icon"
        :icon="[iconPre, icon]"
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
      iconPre: "fas",
      status: "",
      checked: [],
      timer: ""
    };
  },
  emits: ["update:modelValue", "check", "keyup"],
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
    labelSelect: String,
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
    },
    wait: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    setIcon(e) {
      if (!this.wait && e.target.checkValidity()) {
        this.iconPre = "fas";
        this.icon = "check-circle";
        this.status = "valid";
      } else if (this.wait) {
        this.icon = "";
        this.status = "";
        setTimeout(() => {
          this.iconPre = "fad";
          this.icon = "spinner-third";
        }, 500);
      } else {
        this.iconPre = "fas";
        this.icon = "times-circle";
        this.status = "invalid";
      }
    },
    searchCharacter(e) {
      const character = e.value.split(" ").join("+");
      const cl = e.id.includes("cl");
      const silent = true;

      if (this.timer) {
        clearTimeout(this.timer);
      }

      this.timer = setTimeout(() => {
        this.$store
          .dispatch("searchCharacter", [character, cl, silent])
          .then(character => {
            this.$emit("update:modelValue", character.Name);
            this.iconPre = "fas";
            this.icon = "check-circle";
            this.status = "valid";
          })
          .catch(() => {
            console.error("Personnage non trouvé.");
            this.iconPre = "fas";
            this.icon = "times-circle";
            this.status = "invalid";
          });
      }, 1500);
    }
  }
};
</script>

<style lang="scss">
.form {
  @include flex($direction: column, $gap: 25);
  width: 100%;
  &__panel {
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
  &__text {
    text-align: justify;
    width: 100%;
    max-width: 620px;
    padding: 5px 15px;
    margin-bottom: 0;
  }
  &__icon {
    position: absolute;
    right: 5px;
    bottom: 9px;
    color: dark($grey);
    &--valid {
      color: $valid;
    }
    &--invalid {
      color: veil($namazu);
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
      border-radius: 100%;
      transition: border-radius 200ms;
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
      border-radius: 20%;
    }
  }
  &__select-disabled {
    color: $light-black;
  }
  &__option {
    color: black;
  }

  //Form elements
  input,
  textarea,
  select {
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
  textarea,
  select {
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
