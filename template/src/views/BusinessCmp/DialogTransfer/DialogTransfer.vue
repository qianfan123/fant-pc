<!--
 * @Author: 杨珂
 * @Date: 2021-08-10 15:11:41
 * @LastEditTime: 2021-09-22 16:02:47
 * @LastEditors: 杨珂
 * @Description: 
 * @FilePath: \fant-template\src\views\BusinessCmp\DialogTransfer\DialogTransfer.vue
 * 记得注释
-->
<template>
  <page-wrapper>
    <!-- 详情页眉 开始 -->
    <template slot="header">
      <!-- 页面标题或自定义内容（若使用标题，则需用span包裹） -->
      <span>表格穿梭框</span>
      <!-- 页眉标题 结束 -->
      <!-- 页眉按钮组（按钮为一个时，可以不用div包裹） 开始 -->
      <div></div>
      <!-- 页眉按钮组 结束 -->
    </template>
    <!-- 详情页眉 结束 -->

    <!-- 详情主体 开始 -->
    <template slot="body">
      <detail-view>
        <detail-card title="列表信息" :showTag="true">
          <template slot="right">
            <el-button class="sel-btn" type="primary" @click="doShowSelList">选择列表</el-button>
            <el-table :data="selList" style="width: 100%">
              <el-table-column prop="flowNo" label="列一" width="120"> </el-table-column>
              <el-table-column prop="flowNo" label="列二" width="120"> </el-table-column>
              <el-table-column prop="flowNo" label="列三" width="120"> </el-table-column>
              <el-table-column prop="flowNo" label="列四" width="120"> </el-table-column>
            </el-table>
          </template>
        </detail-card>
      </detail-view>
    </template>
    <!-- 详情主体表格 结束 -->
  </page-wrapper>
</template>

<script lang="ts" src="./DialogTransfer.ts"></script>

<style lang="scss" scoped>
.sel-btn {
  margin-bottom: 8px;
}
</style>
