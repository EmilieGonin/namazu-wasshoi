<template lang="html">
  <div class="infos">
    <div class="infos__heading">
      Informations
    </div>
    <span>
      <p>
        Le <strong>Festival Gyôkoso</strong> est un concours mensuel de glamour
        et screenshots au terme duquel sont élus deux
        <strong class="gold">Namazu dorés</strong> ! Participer et remporter le
        festival vous feront tout deux gagner des points pour votre équipe.
      </p>
    </span>
    <div class="infos__heading">
      Règles de participations
    </div>
    <p>
      - Les candidatures doivent d'être envoyées en privé à la @🔴GM👑.
    </p>
    <p>
      - Vous êtes libre d'interpréter le thème comme vous le sentez, et vous
      devrez expliquer votre interprétation du thème en une ou deux phrases,
      donc choisissez bien vos mots !
    </p>
    <p>
      - Vous pouvez accompagner votre participation d'une piste musicale afin de
      renforcer votre interprétation.
    </p>
    <p>
      - Vous êtes autorisés à utiliser Photoshop, mais uniquement pour corriger
      la luminosité et les couleurs ou flouter/renforcer votre image.
    </p>
    <p>
      - Les gagnants de l'édition précédente peuvent participer pour tenter de
      conserver leur titre.
    </p>
    <p>
      - Vous pouvez demander à une ou plusieurs personnes de poser avec vous,
      même si ces personnes participent de leur côté.
    </p>
    <p>
      - Les shaders sont autorisés ! Vous pouvez demander de l'aide pour
      installer GShade sur votre ordinateur auprès de la @🔴GM👑, des
      @🔴Officiers👑 ou même des autres membres !
    </p>
    <p>- Les mods sont interdits !</p>
  </div>
</template>

<script>
export default {
  name: "FestivalInfos"
};
</script>

<style lang="scss" scoped>
.infos {
  &__heading {
    @include title(30);
  }
}
</style>
