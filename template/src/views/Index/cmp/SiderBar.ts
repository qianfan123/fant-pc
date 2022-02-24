/*
 * @Author: 徐庆凯
 * @Date: 2021-04-20 13:41:02
 * @LastEditTime: 2021-04-20 17:47:59
 * @LastEditors: 徐庆凯
 * @Description:
 * @FilePath: \fant-template\src\views\Index\cmp\SiderBar.ts
 * 记得注释
 */
import { Component, Prop, Vue } from "vue-property-decorator";
import { RouteConfig } from "vue-router";
import SiderBarItem from "./SiderBarItem.vue";

@Component({
  name: "SiderBar",
  components: {
    SiderBarItem
  }
})
export default class SiderBar extends Vue {
  @Prop({ default: [] }) menus: RouteConfig[]; // 路由数组

  /**
   * 激活状态的菜单
   */
  get activeMenu() {
    return this.$route.name;
  }
}
