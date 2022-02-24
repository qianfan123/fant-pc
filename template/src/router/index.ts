/*
 * @Author: 徐庆凯
 * @Date: 2021-02-19 16:33:37
 * @LastEditTime: 2021-08-17 17:14:05
 * @LastEditors: 杨珂
 * @Description:
 * @FilePath: \fant-template\src\router\index.ts
 * 记得注释
 */
import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import NProgress from "nprogress"; // 顶部进度条
import "nprogress/nprogress.css"; // 进度条样式
import list from "./modules/list";
import detail from "./modules/detail";
import form from "./modules/form";
import dialog from "./modules/dialog";
import store from "@/store";
NProgress.configure({ showSpinner: false }); // 禁用加载动画
Vue.use(VueRouter);

// 常量路由
export const constantRoutes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Index/Index.vue"),
    redirect: "/list",
    children: [
      {
        path: "/abnormal/:abnormalStatus",
        name: "abnormal",
        component: () => import("@/views/Abnormal/Abnormal.vue")
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login/Login.vue")
  }
];

// 动态路由
export const asyncRoutes: Array<RouteConfig> = [...list, ...form, ...detail, ...dialog];

const createRouter = () =>
  new VueRouter({
    scrollBehavior: () => ({ y: 0, x: 0 }),
    routes: [...constantRoutes]
  });

const router = createRouter();

router.beforeEach(async (to: any, from, next) => {
  NProgress.start();
  if (to.path === "/login") {
    NProgress.done();
    if (store.state.userInfo.token) {
      return next("/");
    } else {
      return next();
    }
  } else {
    // if (store.state.userInfo.token) {
    // eslint-disable-next-line no-constant-condition
    if (true) {
      const availableRoutes = await store.dispatch("submitRoutes");
      let routes: RouteConfig[] = Array.from(router.options.routes || []);
      routes.push(...availableRoutes);
      routes = Array.from(new Set(routes));
      if (!router.options.routes || router.options.routes.length !== routes.length) {
        if (router.options.routes) {
          const existRoutes = router.options.routes.map(item => item.path); // 已存在的路由
          const diffRoutes = routes.filter(item => !existRoutes.includes(item.path)); // 新增路由
          for (let index = 0; index < diffRoutes.length; index++) {
            router.addRoute(diffRoutes[index]);
          }
        } else {
          for (let index = 0; index < routes.length; index++) {
            router.addRoute(routes[index]);
          }
        }
        router.options.routes = routes;
        NProgress.done();
        return next({ ...to, replace: true });
      } else {
        NProgress.done();
        return next();
      }
    } else {
      NProgress.done();
      return next(`/login?redirect=${to.path}`);
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
