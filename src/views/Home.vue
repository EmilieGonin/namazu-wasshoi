<template>
  <AppHeading :icon="'home-lg-alt'">Bienvenue, petit namazu !</AppHeading>
  <div class="home"></div>
</template>

<script>
import AppHeading from "@/components/AppHeading.vue";

export default {
  name: "Home",
  components: {
    AppHeading
  }
};
</script>
