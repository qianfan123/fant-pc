<!--
 * @Author: 徐庆凯
 * @Date: 2021-04-20 13:41:02
 * @LastEditTime: 2021-04-20 17:39:09
 * @LastEditors: 徐庆凯
 * @Description: 侧边导航
 * @FilePath: \fant-template\src\views\Index\cmp\SiderBar.vue
 * 记得注释
-->
<template>
  <el-menu
    :unique-opened="false"
    :default-active="activeMenu"
    background-color="#242633"
    text-color="#79879E"
    active-text-color="#FFFFFF"
  >
    <div v-for="(menu, key) in menus" :key="key">
      <sider-bar-item :menu="menu"> </sider-bar-item>
    </div>
  </el-menu>
</template>

<script lang="ts" src="./SiderBar.ts"></script>

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
