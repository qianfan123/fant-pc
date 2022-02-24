<!--
 * @Author: 徐庆凯
 * @Date: 2021-02-19 16:33:37
 * @LastEditTime: 2021-04-23 10:54:40
 * @LastEditors: 徐庆凯
 * @Description: 
 * @FilePath: \fant-template\src\App.vue
 * 记得注释
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  // min-width: 1024px;
  overflow-x: auto;
  -webkit-font-smoothing: antialiased;
}

* {
  font-family: Microsoft YaHei;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #f0f2f5;
  font-size: 14px;
  height: 100%;
}
</style>
