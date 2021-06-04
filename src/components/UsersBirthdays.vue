<template lang="html">
  <div class="birthdays">
    <div class="birthdays__title">
      Anniversaires du jour
    </div>
    <div class="birthdays__list" v-if="dayBirthdays">
      <div v-for="birthday in birthdays" :key="birthday">
        <font-awesome-icon class="birthdays__icon" icon="bars" fixed-width />
        {{ birthday.day }} : {{ birthday.member }}
      </div>
    </div>
    <div class="birthdays__list" v-else>
      -
    </div>
    <div class="birthdays__title">
      Anniversaires du mois
    </div>
    <div class="birthdays__list" v-if="monthBirthdays">
      <div v-for="birthday in monthBirthdays" :key="birthday">
        <font-awesome-icon class="birthdays__icon" icon="gift" fixed-width />
        {{ birthday.day }} : {{ birthday.member }}
      </div>
    </div>
    <div class="birthdays__list" v-else>
      -
    </div>
  </div>
</template>

<script>
export default {
  name: "UsersBirthdays",
  data() {
    return {
      //temp
      dayBirthdays: "",
      monthBirthdays: [
        { day: "1", name: "Test" },
        { day: "1", name: "Test" },
        { day: "1", name: "Test" },
        { day: "1", name: "Test" },
        { day: "1", name: "Test" },
        { day: "1", name: "Test" }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.birthdays {
  width: 35%;
  min-width: 150px;
  background: $namazu;
  padding: 15px 0;
  &__title {
    @include title(27);
    line-height: 25px;
    text-align: center;
    color: white;
    padding: 0 10px;
  }
  &__list {
    padding: 15px;
    margin: 20px 0;
    background: white;
  }
  &__icon {
    color: dark($namazu);
  }
}
</style>
