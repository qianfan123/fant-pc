/*
 * @Author: 徐庆凯
 * @Date: 2021-04-15 13:17:37
 * @LastEditTime: 2021-11-30 16:49:41
 * @LastEditors: 徐庆凯
 * @Description: 列表模块
 * @FilePath: \fant-template\src\router\modules\list.ts
 * 记得注释
 */
import { RouteConfig } from "vue-router";

const routes: Array<RouteConfig> = [
  {
    path: "/list",
    name: "List",
    redirect: "/basicList",
    meta: {
      title: "列表页",
      icon: "iconfont ic-ui-merge"
    },
    component: () => import("@/views/Index/Index.vue"),
    children: [
      {
        path: "/basicList",
        name: "basicList",
        meta: { title: "基础列表", keepAlive: true },
        component: () => import("@/views/BasicList/BasicList.vue")
      },
      {
        path: "/skuList",
        name: "skuList",
        meta: { title: "商品列表", keepAlive: false },
        component: () => import("@/views/SkuList/SkuList.vue")
      },
      {
        path: "/orderList",
        name: "orderList",
        meta: { title: "订单列表", keepAlive: false },
        component: () => import("@/views/OrderList/OrderList.vue")
      },
      {
        path: "/dataList",
        name: "dataList",
        meta: { title: "数据列表", keepAlive: false },
        component: () => import("@/views/DataList/DataList.vue")
      }
    ]
  }
];

export default routes;
