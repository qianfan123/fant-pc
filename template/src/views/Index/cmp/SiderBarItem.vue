<!--
 * @Author: 徐庆凯
 * @Date: 2021-04-20 13:41:02
 * @LastEditTime: 2021-11-30 16:49:56
 * @LastEditors: 徐庆凯
 * @Description: 侧边导航
 * @FilePath: \fant-template\src\views\Index\cmp\SiderBarItem.vue
 * 记得注释
-->
<template>
  <router-link :to="menu.path" v-if="!hasChildren">
    <el-menu-item :index="menu.name" ref="menuItem">
      {{ menu.meta.icon }}
      <i :class="menu.meta.icon"></i>
      <span slot="title">{{ menu.meta.title }}</span>
    </el-menu-item>
  </router-link>
  <el-submenu :index="menu.name" v-else>
    <template slot="title">
      <i :class="menu.meta.icon"></i>
      <span>{{ menu.meta.title }}</span>
    </template>
    <sider-bar-item v-for="(submenu, key) in menu.children" :key="key" :menu="submenu"> </sider-bar-item>
  </el-submenu>
</template>

<script lang="ts" src="./SiderBarItem.ts"></script>

<style lang="scss" scoped>
.header-left {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: $--color-text-primary;
  .header-left-logo {
    height: 32px;
    margin-right: 10px;
  }
}
.header-right {
  .user-name {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: $--color-text-primary;
    .user-name-icon {
      height: 38px;
      margin-right: 10px;
    }
  }
}
a {
  text-decoration: none !important;
}
</style>
