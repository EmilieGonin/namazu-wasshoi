<template lang="html">
  <div class="members" v-if="status && status != 'loading'">
    <div v-for="member in fcMembers" :key="member.ID">
      <img :src="member.Avatar" alt="Avatar" :title="member.Name" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Members",
  computed: {
    ...mapGetters(["status", "fc", "fcMembers"])
  },
  mounted() {
    this.$store.dispatch("setFreeCompany");
  }
};
</script>

<style lang="scss" scoped></style>
