<template lang="html">
  <div class="viewer" v-if="viewer" @click="setImageViewer">
    <div class="viewer__container">
      <img
        class="viewer__img"
        :src="viewer.url"
        :alt="viewer.title ? viewer.title : ''"
        :title="viewer.title ? viewer.title : ''"
      />
      <div class="viewer__description" v-if="viewer.title">
        {{ viewer.title }}
      </div>
    </div>
    <div class="viewer__icon">
      <font-awesome-icon :icon="'times'" fixed-width />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AppViewer",
  computed: {
    ...mapState(["viewer"])
  },
  methods: {
    setImageViewer() {
      this.$store.dispatch("setImageViewer", null);
    }
  }
};
</script>

<style lang="scss">
.viewer {
  @include absolute-center;
  @include flex;
  position: fixed;
  z-index: 999;
  width: 100%;
  background: fade-out(white, 0.5);
  &__container {
    @include absolute-center;
    @include flex($direction: column);
    width: 90%;
    height: 90%;
  }
  &__img {
    max-width: 100%;
    max-height: 100%;
    border: 3px solid white;
    box-shadow: 0 0 2px $main-black;
  }
  &__icon {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    color: $invalid;
    font-size: 25px;
    background-color: white;
    border-radius: 0 0 0 15px;
  }
  &__description {
    max-width: 100%;
    background: white;
    padding: 5px 20px;
    border-radius: 0 0 10px 10px;
  }
}
</style>
