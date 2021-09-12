const formValidate = {
  methods: {
    formValidate() {
      const form = {};
      const datas = JSON.parse(JSON.stringify(this.$data));

      for (const data of Object.entries(datas)) {
        //Get all datas starting with form_ or formo_
        if (data[0].startsWith("form_") || data[0].startsWith("formo_")) {
          const name = data[0].split("_")[1];
          const category = data[0].split("_")[2];
          let value = data[1];

          if (!data[0].startsWith("formo_") && !value) {
            const error =
              "Veuillez renseigner tous les champs requis du formulaire.";
            this.$store.dispatch("error", error);
            throw error;
          } else if (value && name != "file") {
            if (value == "true" || value == "false") {
              value = !!value;
            }
            
            if (category) {
              if (form[category]) {
                form[category][name] = value;
              } else {
                form[category] = {};
                form[category][name] = value;
              }
            } else {
              form[name] = value;
            }

            if (
              name == "email" &&
              !value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
            ) {
              const error = "L'adresse email est invalide.";
              this.$store.dispatch("error", error);
              throw error;
            } else if (
              name == "password" &&
              !value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
            ) {
              const error =
                "Le mot de passe doit contenir au moins 8 caractères dont une minuscule, une majuscule et un chiffre.";
              this.$store.dispatch("error", error);
              throw error;
            } else if (
              name == "discord" &&
              !value.match(/^[a-zA-Z0-9._%+-]+#[0-9]+$/)
            ) {
              const error = "L'identifiant Discord est incorrect.";
              this.$store.dispatch("error", error);
              throw error;
            }
          } else if (!value && name != "email" && name != "password") {
            form[name] = null;
          }
        }
      }

      return form;
    }
  }
}

module.exports = { formValidate };
