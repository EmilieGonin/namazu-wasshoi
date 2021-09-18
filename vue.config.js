module.exports = {
  transpileDependencies: ['vue-meta'],
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/stylesheets/main.scss";`
      }
    }
  }
}
