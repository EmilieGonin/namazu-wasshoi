<template lang="html">
  <div class="cell">
    <div class="cell__head">
      <div class="cell__profile">
        <!--Theme / Name-->
        <div class="cell__title" v-if="data.theme || data.name">
          {{ data.theme ? data.theme : "" }}
          {{ data.name ? data.name : "" }}
        </div>
        <!--Character-->
        <div class="cell__title" @click="go(data)" v-if="data.Character">
          {{ data.Character.name }}
        </div>
        <!--Team-->
        <div v-if="data.team">
          <strong :class="data.team ? data.team.toLowerCase() : ''">
            {{ data.team }}
          </strong>
        </div>
        <!--Profile-->
        <template v-if="data.Profile">
          <template v-for="(item, name) in data.Profile" :key="item">
            <!--Mic-->
            <font-awesome-layers v-if="name == 'mic'">
              <font-awesome-icon :icon="'microphone'" fixed-width />
              <font-awesome-icon
                :icon="'check-circle'"
                transform="shrink-6 left-10 down-4"
                class="valid"
                v-if="item"
              />
              <font-awesome-icon
                :icon="'times-circle'"
                transform="shrink-6 left-10 down-4"
                class="invalid"
                v-else
              />
            </font-awesome-layers>
            <font-awesome-icon
              :icon="'user'"
              fixed-width
              v-if="item && name == 'name'"
            />
            <font-awesome-icon
              :icon="'gift'"
              fixed-width
              v-if="item && name == 'birthday'"
            />
            <font-awesome-icon
              :icon="['fab', 'discord']"
              fixed-width
              v-if="item && name == 'discord'"
            />
            <template v-if="name != 'mic'">{{ item }}</template>
          </template>
        </template>
      </div>
      <!--Buttons-->
      <AppButton @click="toggle = !toggle" v-if="view == 'Applicants'">
        <span v-if="!toggle">Afficher la candidature</span>
        <span v-else>Fermer la candidature</span>
      </AppButton>
      <AppButton
        :small="true"
        @click="toggle = !toggle"
        v-if="view == 'Festivals' && data.Screenshots.length"
      >
        <font-awesome-icon :icon="'images'" fixed-width v-if="!toggle" />
        <font-awesome-icon :icon="'chevron-up'" fixed-width v-else />
      </AppButton>
      <!--Archive Applicant/Delete User-->
      <AppButton
        :small="true"
        @click="remove(data.id)"
        v-if="view != 'Parameters'"
      >
        <font-awesome-icon :icon="'trash-alt'" fixed-width />
      </AppButton>
    </div>
    <transition name="slide-up">
      <div class="cell__body" v-show="toggle" v-if="view == 'Applicants'">
        <div v-for="item in data" :key="item" class="cell__tab">
          <template v-if="item.label && item.value">
            <div class="cell__cell cell__cell--question">
              {{ item.label }}
            </div>
            <div class="cell__cell cell__cell--answer">
              {{ item.value }}
            </div>
          </template>
        </div>
      </div>
    </transition>

    <transition name="appear">
      <div
        class="cell__screenshot-container"
        v-show="toggle"
        v-if="view == 'Festivals'"
      >
        <template v-for="screenshot in data.Screenshots" :key="screenshot.id">
          <img
            class="cell__screenshot"
            :src="screenshot.url"
            :alt="screenshot.description"
            :title="screenshot.description"
            @click="setImageViewer(screenshot.url, screenshot.description)"
          />
        </template>
      </div>
    </transition>
  </div>
</template>

<script>
import AppButton from "@/components/AppButton.vue";

export default {
  name: "AdminPanelCell",
  components: {
    AppButton
  },
  data() {
    return {
      toggle: false
    };
  },
  emits: ["delete"],
  props: {
    data: Object,
    view: String
  },
  methods: {
    go(data) {
      if (this.view == "Applicants") {
        const id = data.Character.id;
        const lodestone = "https://fr.finalfantasyxiv.com/lodestone/character/";
        window.open(lodestone + id);
      } else if (this.view == "Members") {
        const id = data.id;
        this.$router.push("/user/" + id);
      }
    },
    remove(id) {
      if (confirm("Confirmer la suppression ?")) {
        if (this.view == "Applicants") {
          this.$store.dispatch("deleteApplicant", id).then(() => {
            this.$emit("delete");
          });
        } else if (this.view == "Members") {
          this.$store.dispatch("deleteUser", id).then(() => {
            this.$emit("delete");
          });
        } else if (this.view == "Festivals") {
          this.$store.dispatch("deleteFestival", id).then(() => {
            this.$emit("delete");
          });
        }
      }
    },
    setImageViewer(url, title) {
      const image = { url: url, title: title };
      this.$store.dispatch("setImageViewer", image);
    }
  }
};
</script>

<style lang="scss" scoped>
.cell {
  @include flex($direction: column);
  position: relative;
  width: 100%;
  max-width: 1100px;
  padding: 5px;
  margin: auto;
  margin-bottom: 5px;
  background-color: white;
  box-shadow: 0 0 5px $grey;
  &__head {
    @include flex($gap: 10, $align: stretch);
    flex-wrap: wrap;
    width: 100%;
  }
  &__title {
    @include page-title;
    font-size: 27px;
    transform: translateY(2px);
    cursor: pointer;
  }
  &__profile {
    @include flex($gap: 10, $justify: flex-start);
    flex-wrap: wrap;
    border: 2px solid $namazu;
    padding: 3px 10px;
    flex-grow: 2;
  }
  &__body {
    @include flex($gap: 10);
    flex-wrap: wrap;
    margin: 15px 0;
    overflow: hidden;
  }
  &__tab {
    @include flex($direction: column);
    width: 100%;
    max-width: 290px;
  }
  &__cell {
    width: 100%;
    padding: 5px;
    font-size: $font-small;
    background-color: $minor-white;
    &--question {
      background-color: $namazu;
      border: 2px solid $namazu;
      color: white;
      text-align: center;
    }
    &--answer {
      height: 125px;
      overflow: auto;
      border: 2px solid fade-out(black, 0.7);
      border-radius: 0 0 5px 5px;
      border-top: none;
    }
  }
  &__screenshot-container {
    @include flex($gap: 5);
    flex-wrap: wrap;
    padding: 10px;
  }
  &__screenshot {
    display: block;
    width: 300px;
    object-fit: cover;
    cursor: pointer;
  }
}
</style>
