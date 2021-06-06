<template lang="html">
  <div class="teams">
    <TeamsPanel :team="'mog'">Pas de coups sous le pompon !</TeamsPanel>
    <TeamsPanel :team="'chocobo'">On est chaud... cobo !</TeamsPanel>
    <TeamsPanel :team="'pampa'">Qui s'y frotte s'y pique !</TeamsPanel>
    <TeamsPanel :team="'carbuncle'">
      Que la poussière de diamant vous réduise en éclat !
    </TeamsPanel>
  </div>
</template>

<script>
import TeamsPanel from "@/components/TeamsPanel.vue";

export default {
  name: "Teams",
  components: {
    TeamsPanel
  }
};
</script>

<style lang="scss" scoped></style>
