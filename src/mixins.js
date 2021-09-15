const formValidate = {
  methods: {
    formValidateRequired() {
      const datas = JSON.parse(JSON.stringify(this.$data));

      for (const data of Object.entries(datas)) {
        let value = data[1];

        if (!data[0].startsWith("formo_") && !value) {
          const error =
            "Veuillez renseigner tous les champs requis du formulaire.";
          this.$store.dispatch("error", error);
          throw error;
        }
      }

      return true;
    },
    formValidate() {
      const form = {};
      const datas = JSON.parse(JSON.stringify(this.$data));

      for (const data of Object.entries(datas)) {
        //Get all datas starting with form_ or formo_
        if (data[0].startsWith("form_") || data[0].startsWith("formo_")) {
          const name = data[0].split("_")[1];
          const category = data[0].split("_")[2];
          let value = data[1];

          //If value is removed or empty, set it null
          if (value == "") {
            value = null;
          }

          if (!data[0].startsWith("formo_") && !value) {
            const error =
              "Veuillez renseigner tous les champs requis du formulaire.";
            this.$store.dispatch("error", error);
            throw error;
          } else if ((value || (value === null && name != "email" && name != "password")) && name != "file") {
            //Above we check if there's a value OR if the value is null BUT isn't email or password, or if value isn't file

            //Prevent value from being string if value is true or false
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

            const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const passwordRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}/;
            const discordRegexp = /^.+#[0-9]+$/;

            if (
              value && name == "email" &&
              !emailRegexp.test(value)
            ) {
              const error = "L'adresse email est invalide.";
              this.$store.dispatch("error", error);
              throw error;
            } else if (
              value && name == "password" &&
              !passwordRegexp.test(value)
            ) {
              const error =
                "Le mot de passe doit contenir au moins 8 caractères dont une minuscule, une majuscule et un chiffre.";
              this.$store.dispatch("error", error);
              throw error;
            } else if (
              value && name == "discord" &&
              !discordRegexp.test(value)
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
