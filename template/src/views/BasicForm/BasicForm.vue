<!--
 * @Author: 徐庆凯
 * @Date: 2021-02-19 16:33:37
 * @LastEditTime: 2021-11-30 17:14:45
 * @LastEditors: 徐庆凯
 * @Description: 
 * @FilePath: \fant-template\src\views\BasicForm\BasicForm.vue
 * 记得注释
-->
<template>
  <page-wrapper>
    <!-- 表单页眉 开始 -->
    <template slot="header">
      <!-- 页面标题或自定义内容（若使用标题，则需用span包裹） -->
      <span>基础表单</span>
      <!-- 页眉标题 结束 -->
      <!-- 页眉按钮组（按钮为一个时，可以不用div包裹） 开始 -->
      <div>
        <el-button type="primary" size="large">提交</el-button>
        <el-button size="large" @click="doBack">返回</el-button>
      </div>
      <!-- 页眉按钮组 结束 -->
    </template>
    <!-- 表单页眉 结束 -->

    <!-- 表单主体 开始 -->
    <template slot="body">
      <!-- 详情视图 开始（可以作为详情与表单的容器） -->
      <detail-view>
        <!-- 表单卡片 参数有showTag,title,type 具体用法可参照本页面及组件内注释 -->
        <!-- 不同type对应不同颜色，可以作为表单页面状态的容器 -->
        <el-form :model="form" :rules="rules" :inline-message="true" ref="basicForm" label-width="120px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="门店代码" prop="code">
                <span class="tip">- 系统自动生成，可修改，最多不超过10个字符</span>
                <el-input v-model="form.code"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="门店名称" prop="name">
                <el-input ref="name" v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="联系人" prop="contacts">
                <el-input ref="contacts" v-model="form.contacts"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="联系电话" prop="mobile">
                <el-input ref="mobile" v-model="form.mobile"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="门店类型" prop="type">
                <el-select
                  v-model="form.type"
                  ref="type"
                  filterable
                  clearable
                  value-key="uuid"
                  placeholder="请下拉选择或输入查询"
                >
                  <el-option
                    v-for="item in optionList"
                    :key="item.uuid"
                    :value="`${item.name}[${item.mobile}]`"
                    :label="`${item.name}[${item.mobile}]`"
                  >
                    {{ item.name }}[{{ item.mobile }}]
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="门店地址" prop="address">
                <el-input ref="address" v-model="form.address"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="">
                <el-button type="primary" size="large">提交</el-button>
                <el-button size="large" @click="doBack">返回</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </detail-view>
      <!-- 详情视图 结束 -->
    </template>
    <!-- 表单主体 结束 -->
  </page-wrapper>
</template>

<script lang="ts" src="./BasicForm.ts"></script>

<style lang="scss" scoped>
/deep/.el-form-item {
  margin-bottom: 24px;
}
</style>
