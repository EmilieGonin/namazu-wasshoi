<template>
  <span><slot></slot> {{ dateonly || birthday ? getDate : getDateFull }}</span>
</template>

<script>
import { format, formatDistanceToNow } from "date-fns";
import fr from "date-fns/locale/fr";

export default {
  name: "DateItem",
  props: {
    date: String,
    dateonly: {
      type: Boolean,
      default: false
    },
    short: {
      type: Boolean,
      default: true
    },
    birthday: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    getDate() {
      if (this.short && !this.birthday) {
        return format(new Date(this.date), "dd'/'MM", {
          locale: fr
        });
      } else if (this.birthday) {
        return format(new Date(this.date), "dd'/'MM'/'yyyy", {
          locale: fr
        });
      } else {
        return format(new Date(this.date), "dd MMMM yyyy", {
          locale: fr
        });
      }
    },
    getDateFull() {
      if (this.short) {
        return format(new Date(this.date), "dd'/'MM - HH':'mm", {
          locale: fr
        });
      } else {
        return format(new Date(this.date), "dd MMMM yyyy - HH':'mm", {
          locale: fr
        });
      }
    },
    getTimeAgo() {
      return formatDistanceToNow(new Date(this.date), {
        addSuffix: true,
        includeSeconds: true,
        locale: fr
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
