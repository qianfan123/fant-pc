/*
 * @Author: 徐庆凯
 * @Date: 2021-04-20 13:41:02
 * @LastEditTime: 2021-04-20 17:29:19
 * @LastEditors: 徐庆凯
 * @Description:
 * @FilePath: \fant-template\src\views\Index\cmp\SiderBarItem.ts
 * 记得注释
 */
import { Component, Prop, Vue } from "vue-property-decorator";
import { RouteConfig } from "vue-router";

@Component({
  name: "SiderBarItem"
})
export default class SiderBarItem extends Vue {
  @Prop({}) menu: RouteConfig;

  // 是否有子节点
  get hasChildren() {
    return this.menu.children && this.menu.children.length;
  }
}
