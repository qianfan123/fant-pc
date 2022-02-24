/*
 * @Author: 徐庆凯
 * @Date: 2021-04-15 13:17:37
 * @LastEditTime: 2021-11-30 16:47:47
 * @LastEditors: 徐庆凯
 * @Description:
 * @FilePath: \fant-template\src\router\modules\detail.ts
 * 记得注释
 */
import { RouteConfig } from "vue-router";

const routes: Array<RouteConfig> = [
  {
    path: "/detail",
    name: "Detail",
    meta: { title: "详情页", icon: "iconfont ic-ui-location" },
    redirect: "/basicDetail",
    component: () => import("@/views/Index/Index.vue"),
    children: [
      {
        path: "/basicDetail",
        name: "basicDetail",
        meta: { title: "基础详情", keepAlive: false },
        component: () => import("@/views/BasicDetail/BasicDetail.vue")
      },
      {
        path: "/complexDetail",
        name: "complexDetail",
        meta: { title: "复杂详情", keepAlive: false },
        component: () => import("@/views/ComplexDetail/ComplexDetail.vue")
      }
    ]
  }
];

export default routes;
