/*
 * @Author: 杨珂
 * @Date: 2021-08-09 14:50:46
 * @LastEditTime: 2021-11-30 16:48:09
 * @LastEditors: 徐庆凯
 * @Description:
 * @FilePath: \fant-template\src\router\modules\dialog.ts
 * 记得注释
 */
import { RouteConfig } from "vue-router";

const routes: Array<RouteConfig> = [
  {
    path: "/BusinessCmp",
    name: "BusinessCmp",
    meta: { title: "业务组件", icon: "iconfont ic-ui-pay" },
    redirect: "/basicDetail",
    component: () => import("@/views/Index/Index.vue"),
    children: [
      {
        path: "/dialogSel",
        name: "dialogSel",
        meta: { title: "弹框选择器", keepAlive: false },
        component: () => import("@/views/BusinessCmp/DialogSel/DialogSel.vue")
      },
      {
        path: "/dialogTransfer",
        name: "dialogTransfer",
        meta: { title: "表格穿梭框", keepAlive: false },
        component: () => import("@/views/BusinessCmp/DialogTransfer/DialogTransfer.vue")
      }
    ]
  }
];

export default routes;
