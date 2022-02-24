<!--
 * @Author: 徐庆凯
 * @Date: 2021-02-19 16:33:37
 * @LastEditTime: 2021-11-30 16:23:37
 * @LastEditors: 徐庆凯
 * @Description: 
 * @FilePath: \fant-template\src\layouts\BasicLayoutSingle\BasicLayout.vue
 * 记得注释
-->
<template>
  <div class="basic-layout">
    <div class="basic-layout-sider">
      <div class="logo">
        <img class="logo-img" src="@/assets/img/pic_logo.png" alt="logo" />
      </div>
      <slot name="sider"> </slot>
    </div>
    <div class="basic-layout-container">
      <header class="header">
        <slot name="header"></slot>
      </header>
      <main class="main">
        <slot name="main"></slot>
      </main>
    </div>
  </div>
</template>
<script lang="ts" src="./BasicLayout.ts"></script>

<style lang="scss" scoped>
.basic-layout {
  background: $--color-primary;
  display: flex;
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  .basic-layout-sider {
    z-index: 1;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */
    width: 200px;
    height: 100%;
    flex: 0 0 auto;
    background: $--color-text-primary;
    overflow-y: auto;
    .logo {
      display: flex;
      align-items: center;
      width: 200px;
      height: 60px;
      padding: 26px;
      box-sizing: border-box;
      .logo-img {
        width: 86px;
        height: auto;
      }
    }
    .el-menu-vertical-demo {
      width: 200px;
    }
    /deep/.el-menu {
      border: none;
    }
  }

  .basic-layout-sider::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }

  .basic-layout-container {
    flex: 1 1 auto;
    min-height: 100%;
    overflow-x: auto;
    .header {
      width: 100%;
      height: 64px;
      box-sizing: border-box;
      padding: 0 32px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #ffffff;
    }
    .main {
      width: 100%;
      height: calc(100% - 64px);
      box-sizing: border-box;
      // padding: 20px;
      background-color: #f0f2f6;
      overflow: auto;
    }
  }
}
</style>
