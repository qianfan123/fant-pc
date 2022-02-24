/*
 * @Author: 徐庆凯
 * @Date: 2021-02-19 16:33:37
 * @LastEditTime: 2021-04-21 10:59:15
 * @LastEditors: 徐庆凯
 * @Description:
 * @FilePath: \fant-template\src\store\index.ts
 * 记得注释
 */
import Vue from "vue";
import Vuex, { Commit } from "vuex";
import { asyncRoutes } from "@/router";
import { RouteConfig } from "vue-router";
import UserInfo from "@/model/login/UserInfo";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);
export interface State {
  permission: Nullable<string[]>; // 权限列表
  userInfo: UserInfo; // 用户信息
  routes: RouteConfig[]; // 路由列表
}

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      reducer(state) {
        return {
          userInfo: state.userInfo // 配置只储存state中的userInfo
        };
      }
    })
  ],
  state: {
    permission: null, // 权限列表
    userInfo: new UserInfo(), // 用户信息
    routes: [] // 路由列表
  },
  mutations: {
    // 用户信息更新
    userInfo(state: State, userInfo: UserInfo) {
      state.userInfo = userInfo;
    },
    /**
     * 提交路由
     * @param state state
     * @param routes 路由
     */
    submitRoutes(state: State, routes: RouteConfig[]) {
      state.routes = routes;
    },
    // 登出
    logout(state: State) {
      state.permission = null;
      state.userInfo = new UserInfo();
      state.routes = [];
    }
  },
  getters: {
    /**
     * 获取路由
     * @param state state
     */
    routes(state: State) {
      return generateRoute(asyncRoutes);
    }
  },
  actions: {
    // 用户信息更新
    userInfo(context: { commit: Commit }, userInfo: UserInfo) {
      context.commit("userInfo", userInfo);
    },
    /**
     * 提交路由
     * @param context
     * @param routes 路由
     */
    submitRoutes(context: { commit: Commit }) {
      return new Promise(resolve => {
        let routes: RouteConfig[] = [];
        routes = generateRoute(asyncRoutes);
        // todo
        context.commit("submitRoutes", routes);
        resolve(routes);
      });
    },
    /**
     * 提交路由
     * @param context
     * @param routes 路由
     */
    logout(context: { commit: Commit }) {
      context.commit("logout");
    }
  },
  modules: {}
});

/**
 * 生成可用路由列表
 */
export function generateRoute(routes: RouteConfig[], parent?: RouteConfig) {
  for (let index = 0; index < routes.length; index++) {
    if (parent) {
      console.log(parent);
    }
  }
  return routes;
}
