module.exports = {
    publicPath: "./",
    lintOnSave: false,
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "@/assets/styles/var.scss";`
            }
        }
    },
    runtimeCompiler: true,
    productionSourceMap: true
};