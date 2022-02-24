/*
 * @Author: 杨珂
 * @Date: 2021-08-09 15:22:50
 * @LastEditTime: 2021-08-09 15:41:53
 * @LastEditors: 杨珂
 * @Description:
 * @FilePath: \fant-template\src\components\dialog\index.ts
 * 记得注释
 */

import Vue from "vue";
import DialogService from "./DialogService";

declare module "vue/types/vue" {
  interface Vue {
    $dialog: any;
    controller: any;
  }
}
const install: any = function(Vue: typeof import("vue/types/umd")) {
  if (install.installed) return;

  Vue.prototype.$dialog = DialogService;
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}
Vue.use({ install });
