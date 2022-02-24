<!--
 * @Author: 徐庆凯
 * @Date: 2021-02-19 16:33:37
 * @LastEditTime: 2021-11-30 15:19:52
 * @LastEditors: 徐庆凯
 * @Description: 
 * @FilePath: \fant-template\src\components\detail-view\DetailView.vue
 * 记得注释
-->
<template>
  <!-- 基础详情页外层视图 -->
  <div class="detail-view">
    <!-- 内容区 -->
    <slot></slot>
    <!-- 内容区结束 -->
  </div>
</template>

<script lang="ts" src="./DetailView.ts"></script>

<style lang="scss" scoped>
.detail-view {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding-top: 24px;
  background: #ffffff;
}
</style>
