module.exports = (api, options, rootOptions) => {
    // 复制并用 ejs 渲染 `./template` 内所有的文件
    api.render('../template')
    // 修改 `package.json` 里的字段
    api.extendPackage({
        repository: {
            "type": "git",
            "url": "git+https://github.com/qianfan123/fant-cli"
        },
        dependencies: {
            "axios": "^0.19.2",
            "core-js": "^3.6.5",
            "fant2": "0.0.15",
            "vue": "^2.6.11",
            "vue-class-component": "^7.2.3",
            "vue-property-decorator": "^8.5.1",
            "vue-router": "^3.3.4",
            "vuex": "^3.4.0",
            "vuex-class": "^0.3.2"
        },
        devDependencies: {
            "@typescript-eslint/eslint-plugin": "^2.33.0",
            "@typescript-eslint/parser": "^2.33.0",
            "@vue/cli-plugin-babel": "^4.4.4",
            "@vue/cli-plugin-eslint": "^4.4.4",
            "@vue/cli-plugin-router": "^4.4.4",
            "@vue/cli-plugin-typescript": "^4.4.4",
            "@vue/cli-plugin-vuex": "^4.4.4",
            "@vue/cli-service": "^4.4.4",
            "@vue/eslint-config-prettier": "^6.0.0",
            "@vue/eslint-config-typescript": "^5.0.2",
            "cross-env": "^7.0.2",
            "eslint": "^6.7.2",
            "eslint-plugin-prettier": "^3.1.4",
            "eslint-plugin-vue": "^6.2.2",
            "mockjs": "^1.1.0",
            "node-sass": "^4.12.0",
            "sass-loader": "^8.0.2",
            "typescript": "^3.9.5",
            "vue-template-compiler": "^2.6.11"
        },
        "scripts": {
            "serve": "cross-env NODE_ENV=development vue-cli-service serve",
            "build": "cross-env NODE_ENV=development vue-cli-service build",
            "uat": "cross-env NODE_ENV=uat vue-cli-service build",
            "production": "cross-env NODE_ENV=production vue-cli-service build"
        },
        config: {},
        gitHooks: {}
    })

    if (options.elementUI) {
        api.extendPackage({
            devDependencies: {
                "element-ui": "^2.13.0"
            }
        })
    }
}