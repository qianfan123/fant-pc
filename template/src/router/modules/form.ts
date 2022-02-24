/*
 * @Author: 徐庆凯
 * @Date: 2021-04-15 13:17:37
 * @LastEditTime: 2021-11-30 16:49:14
 * @LastEditors: 徐庆凯
 * @Description:
 * @FilePath: \fant-template\src\router\modules\form.ts
 * 记得注释
 */
import { RouteConfig } from "vue-router";

const routes: Array<RouteConfig> = [
  {
    path: "/form",
    name: "Form",
    meta: { title: "表单页", icon: "iconfont ic-ui-project" },
    redirect: "/basicForm",
    component: () => import("@/views/Index/Index.vue"),
    children: [
      {
        path: "/basicForm",
        name: "basicForm",
        meta: { title: "基础表单", keepAlive: false },
        component: () => import("@/views/BasicForm/BasicForm.vue")
      },
      {
        path: "/complexForm",
        name: "complexForm",
        meta: { title: "复杂表单", keepAlive: false },
        component: () => import("@/views/ComplexForm/ComplexForm.vue")
      },
      {
        path: "/stepForm",
        name: "stepForm",
        meta: { title: "分步表单", keepAlive: false },
        component: () => import("@/views/StepForm/StepForm.vue")
      }
    ]
  }
];

export default routes;
