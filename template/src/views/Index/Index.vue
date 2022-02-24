<!--
 * @Author: 徐庆凯
 * @Date: 2021-02-19 16:33:37
 * @LastEditTime: 2021-04-23 10:49:00
 * @LastEditors: 徐庆凯
 * @Description: 页面容器
 * @FilePath: \fant-template\src\views\Index\Index.vue
 * 记得注释
-->
<template>
  <!-- 此处为布局容器组件，由layouts目录引入，可以选择切换不同的布局 -->
  <basic-layout>
    <!-- 页面header 开始 -->
    <template slot="header">
      <div class="header-left">
        <img src="@/assets/img/pic_logo.png" class="header-left-logo" />
        <span>Fant Admin</span>
      </div>
      <el-dropdown class="header-right" trigger="click" @command="doLogout">
        <div class="user-name">
          <img src="@/assets/img/common/ic_portrait@2x.png" class="user-name-icon" />
          <span>{{ userInfo.nickName }}</span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>登出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </template>
    <!-- 页面header 结束 -->

    <!-- 侧边导航 开始 -->
    <template slot="sider">
      <sider-bar :menus="routes"></sider-bar>
    </template>
    <!-- 侧边导航 结束 -->

    <!-- 容器主体 -->
    <template slot="main">
      <keep-alive>
        <transition name="fade-transform" mode="out-in">
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </transition>
      </keep-alive>
      <transition name="fade-transform" mode="out-in">
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </transition>
    </template>
  </basic-layout>
</template>

<script lang="ts" src="./Index.ts"></script>

<style lang="scss" scoped>
.header-left {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: $--color-text-primary;
  &-logo {
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
    &-icon {
      height: 38px;
      margin-right: 10px;
    }
  }
}
a {
  text-decoration: none !important;
}
</style>
