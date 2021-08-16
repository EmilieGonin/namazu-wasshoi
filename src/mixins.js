const formValidate = {
  methods: {
    formValidate() {
      const form = {};
      const datas = JSON.parse(JSON.stringify(this.$data));

      for (const data of Object.entries(datas)) {
        if (data[0].startsWith("form_") || data[0].startsWith("formo_")) {
          const name = data[0].split("_")[1];
          const value = data[1];

          if (!data[0].startsWith("formo_") && !value) {
            const error =
              "Veuillez renseigner tous les champs requis du formulaire.";
            this.$store.dispatch("error", error);
            throw error;
          } else if (value) {
            form[name] = value;
            
            if (
              data[0].includes("email") &&
              !data[1].match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
            ) {
              const error = "L'adresse email est invalide.";
              this.$store.dispatch("error", error);
              throw error;
            } else if (
              data[0].includes("password") &&
              !data[1].match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
            ) {
              const error =
                "Le mot de passe doit contenir au moins 8 caractères dont une minuscule, une majuscule et un chiffre.";
              this.$store.dispatch("error", error);
              throw error;
            } else if (
              data[0].includes("discord") &&
              !data[1].match(/^[a-zA-Z0-9._%+-]+#[0-9]+$/)
            ) {
              const error = "L'identifiant Discord est incorrect.";
              this.$store.dispatch("error", error);
              throw error;
            }
          }
        }
      }

      return form;
    }
  }
}

module.exports = { formValidate };
