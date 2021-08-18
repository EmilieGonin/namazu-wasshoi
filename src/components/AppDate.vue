<template>
  <div><slot></slot> {{ full ? getDateFull : getDate }}</div>
</template>

<script>
import { format, formatDistanceToNow } from "date-fns";
import fr from "date-fns/locale/fr";

export default {
  name: "DateItem",
  props: {
    date: String,
    full: Boolean
  },
  computed: {
    getDate() {
      return format(new Date(this.date), "dd'/'MM - HH':'mm", {
        locale: fr
      });
    },
    getDateFull() {
      return format(new Date(this.date), "dd MMMM yyyy - HH':'mm", {
        locale: fr
      });
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
