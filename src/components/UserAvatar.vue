<template lang="html">
  <img class="avatar" src="@/assets/avatar_sample.jpg" alt="" />
</template>

<script>
export default {
  name: "UserAvatar"
};
</script>

<style lang="scss" scoped>
.avatar {
  display: block;
  border-radius: 50%;
  border: 2px solid $black-veil;
  height: 40px;
  width: 40px;
  object-fit: cover;
  &:hover {
    border: 2px solid fade-in($black-veil, 0.1);
  }
}
</style>
