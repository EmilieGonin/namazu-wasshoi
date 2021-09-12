<template lang="html">
  <!--Field-->
  <div class="form__field" :class="{ 'form__field--large': large }">
    <!--Required-->
    <div class="form__required" v-if="required">*</div>
    <!--Label-->
    <label class="form__label" :for="name" v-if="label">
      {{ label }}
    </label>
    <!--Textarea-->
    <textarea
      :value="modelValue"
      :id="name"
      :required="required"
      rows="8"
      cols="80"
      v-if="type == 'textarea'"
      @input="$emit('update:modelValue', $event.target.value), setIcon($event)"
    ></textarea>
    <!--Select-->
    <select
      class="form__checkbox-container"
      :class="{ 'form__select-disabled': !modelValue }"
      :name="name"
      :id="name"
      @change="$emit('update:modelValue', $event.target.value)"
      v-else-if="type == 'select'"
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
    <!--Checkbox-->
    <div
      class="form__checkbox-container"
      :class="{
        'form__checkbox-container--box': !bigLabel
      }"
      v-else-if="type == 'checkbox'"
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
    <!--Radio-->
    <div
      class="form__checkbox-container"
      :class="{ 'form__checkbox-container--box': !bigLabel }"
      v-else-if="type == 'radio'"
    >
      <span v-for="(input, index) in inputs" :key="input.name">
        <input
          type="radio"
          :value="input.value ? input.value : input.name"
          :id="name + '-' + input.name"
          :name="name"
          :class="{ 'form__checkbox-input': input.label }"
          @change="$emit('update:modelValue', $event.target.value)"
        />
        <label :for="name + '-' + input.name">
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
    <!--File-->
    <div class="form__container" v-else-if="type == 'file'">
      <input
        :value="modelValue"
        :id="name"
        :type="type"
        :required="required"
        ref="file"
        accept="image/png, image/jpeg"
        v-if="uploadReady"
        @change="
          $emit('update:modelValue', $event.target.value),
            setIcon($event),
            $emit('upload', handleFile())
        "
      />
      <div class="form__file-container" v-if="preview">
        <img class="form__file" :src="preview" />
        <!--Delete File Button-->
        <font-awesome-icon
          class="form__file-icon"
          v-if="preview"
          :icon="'times-circle'"
          fixed-width
          @click="removeFile()"
        />
      </div>
    </div>
    <!--Input-->
    <input
      :value="modelValue"
      :id="name"
      :type="type"
      :required="required"
      :disabled="disabled"
      :pattern="regex(name)"
      v-else
      @input="
        $emit('update:modelValue', $event.target.value),
          setIcon($event),
          name.includes('name_Character') ? searchCharacter($event.target) : ''
      "
    />
    <font-awesome-icon
      v-if="disabled"
      @click="$emit('allow-edit', $event.target)"
      class="form__icon form__icon--edit"
      :icon="'edit'"
      fixed-width
    />
    <!--Valid/Invalid Icon-->
    <font-awesome-icon
      class="form__icon"
      :class="{
        'form__icon--valid': status == 'valid',
        'form__icon--invalid': status == 'invalid',
        'fa-spin': icon == 'spinner-third'
      }"
      v-if="icon && type != 'file'"
      :icon="[iconPre, icon]"
      fixed-width
    />
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
      timer: "",
      uploadReady: true,
      handledFile: "",
      preview: ""
    };
  },
  emits: ["update:modelValue", "check", "keyup", "allow-edit", "upload"],
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
    //Element type
    type: {
      type: String,
      default: "text"
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
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    setIcon(e) {
      if (!e.target.value) {
        this.icon = "";
        this.status = "";
      } else if (!this.wait && e.target.checkValidity()) {
        this.iconPre = "fas";
        this.icon = "check-circle";
        this.status = "valid";
      } else if (this.wait) {
        this.icon = "";
        this.status = "";
        setTimeout(() => {
          this.iconPre = "fad";
          this.icon = "spinner-third";
        }, 1000);
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
      }, 3000);
    },
    regex(name) {
      if (name.includes("email")) {
        return "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$";
      } else if (name.includes("password")) {
        return "(?=.*)(?=.*[a-z])(?=.*[A-Z]).{8,}";
      } else if (name.includes("discord")) {
        return "^[a-zA-Z0-9._%+-]+#[0-9]+$";
      }
    },
    handleFile() {
      this.handledFile = this.$refs.file.files[0];
      this.preview = URL.createObjectURL(this.handledFile);
      return this.handledFile;
    },
    removeFile() {
      this.handledFile = "";
      this.preview = "";
      this.uploadReady = false;
      this.$nextTick(() => {
        this.uploadReady = true;
      });
      this.$emit("upload", null);
    }
  }
};
</script>

<style lang="scss">
.form {
  @include flex($direction: column, $gap: 25);
  width: 100%;
  &__buttons {
    @include flex($align: stretch, $gap: 5);
  }
  &__container {
    width: 100%;
  }
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
    &--edit {
      color: $namazu;
    }
  }
  &__field {
    @include flex($direction: column);
    position: relative;
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
  &__required {
    position: absolute;
    top: 27px;
    right: -10px;
    color: $namazu;
  }
  &__file-container {
    position: relative;
    width: 100%;
    max-width: 300px;
    margin-top: 20px;
    border: 3px solid white;
    box-shadow: 0 0 2px $main-black;
  }
  &__file {
    display: block;
    width: 100%;
    object-fit: cover;
  }
  &__file-icon {
    font-size: 20px;
    position: absolute;
    top: 3px;
    right: 0;
    color: $invalid;
    cursor: pointer;
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
  input[type="file"] {
    padding-top: 5px;
  }
  input:disabled {
    background-color: $grey;
    border: 2px solid dark($grey, 5%);
    border-top: 2px solid $namazu;
    color: dark($grey, 25%);
  }
}
</style>
