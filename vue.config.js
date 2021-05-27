const GoogleFontsPlugin = require("@beyonk/google-fonts-webpack-plugin")

module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/stylesheets/main.scss";`
      }
    }
  },
  configureWebpack: {
        plugins: [
            new GoogleFontsPlugin({
                fonts: [
                    { family: "Roboto", variants: [ "400", "700" ] },
                    { family: "Pattaya" }
                ]
            })
        ]
    }
}
