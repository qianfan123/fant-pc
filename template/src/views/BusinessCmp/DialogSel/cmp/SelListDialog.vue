<!--
 * @Author: 杨珂
 * @Date: 2021-08-09 14:47:37
 * @LastEditTime: 2021-09-22 16:15:52
 * @LastEditors: 杨珂
 * @Description: 
 * @FilePath: \fant-template\src\views\BusinessCmp\DialogSel\cmp\SelListDialog.vue
 * 记得注释
-->
<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    :width="showSelected ? '900px' : '700px'"
    class="el-dialog__height-max"
  >
    <div class="product-select-dialog">
      <div class="product-select-dialog__left">
        <div class="product-select-dialog__left-filter">
          <el-row :gutter="10">
            <el-col :span="8">
              <el-input
                placeholder="搜索条件一"
                class="filter-input"
                v-model="filterParams['keyword:%=%']"
                clearable
                @keydown.enter.native="doSearch()"
              ></el-input>
            </el-col>
            <el-col :span="8">
              <el-select v-model="filterParams['status:=']" placeholder="搜索条件二" clearable>
                <el-option v-for="(item, key) in options" :key="key" :label="item" :value="key"> </el-option>
              </el-select>
            </el-col>
            <el-col :span="8">
              <el-button type="primary" size="large" @click="doSearch()">查询</el-button>
              <el-button size="large" @click="doReset()">重置</el-button>
            </el-col>
          </el-row>
        </div>
        <div style="flex-grow: 1;">
          <el-table ref="table" :data="rowData" :stripe="false" height="100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" :selectable="selectable" fixed></el-table-column>
            <el-table-column label="列一" min-width="120" show-overflow-tooltip>
              <template slot-scope="{ row }">
                {{ row.flowNo | empty }}
              </template>
            </el-table-column>
            <el-table-column prop="code" label="列二" width="120" show-overflow-tooltip>
              <template slot-scope="{ row }">
                {{ row.flowNo | empty }}
              </template>
            </el-table-column>
            <el-table-column label="列三" min-width="100" show-overflow-tooltip>
              <template slot-scope="{ row }">
                {{ row.flowNo | empty }}
              </template>
            </el-table-column>
            <el-table-column prop="qpc" label="列四" width="80" show-overflow-tooltip>
              <template slot-scope="{ row }"> 1*{{ row.flowNo }} </template>
            </el-table-column>
          </el-table>
        </div>
        <el-pagination
          layout="total, prev, pager, next"
          :page-size="pageSize"
          :pager-count="5"
          :total="rowTotal"
          :current-page="page"
          @current-change="doSearch($event)"
        />
      </div>
      <div class="product-select-dialog__right" v-if="showSelected">
        <div class="products-selected__header">
          <div class="selected__count">
            已选列表：<span class="count">{{ internalSelected.length }}</span>
          </div>
          <el-button type="text" size="large" @click="internalSelected = []" v-if="internalSelected.length"
            >清空</el-button
          >
        </div>
        <div class="products-selected__body">
          <div class="products-selected__body-item" v-for="(item, index) in internalSelected" :key="index">
            <div class="product__info">{{ item.flowNo }}</div>
            <div class="delete-btn el-icon el-icon-ic_delete" @click="internalSelected.splice(index, 1)"></div>
          </div>
        </div>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button size="large" @click="controller.cancel()">取 消</el-button>
      <el-button size="large" type="primary" @click="doConfirm()">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts" src="./SelListDialog.ts"></script>
<style lang="scss" scoped>
.el-dialog__height-max {
  /deep/ .el-dialog__body {
    height: calc(70vh - 100px);
    padding: 20px;
  }
}
.el-button {
  min-width: 75px;
  & + .el-button {
    margin-left: 12px;
  }
  &.el-button--text {
    min-width: 0;
  }
}
.product-select-dialog {
  display: flex;
  overflow: hidden;
  height: 100%;

  &__left {
    border: 1px solid $--border-color-base;
    display: flex;
    flex-direction: column;
    flex-shrink: 1;
    flex-grow: 1;
    margin-right: 16px;
    width: 422px;

    &-filter {
      padding: 12px;
      .filter-input {
        margin-right: 12px;
        // width: 264px;
      }
    }

    .el-pagination {
      padding: 12px;
      text-align: right;
    }
  }

  &__right {
    width: 300px;
    flex-shrink: 0;
    border: 1px solid $--border-color-base;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .products-selected {
      &__header {
        padding: 12px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid $--border-color-base;

        .selected__count {
          line-height: 32px;
          flex-grow: 1;
          font-size: 14px;

          .count {
            color: #ef821e;
            font-size: 14px;
            font-weight: 600;
          }
        }
      }

      &__body {
        height: 100%;
        overflow: auto;

        &-item {
          padding: 10px;
          line-height: 20px;
          display: flex;
          align-items: center;

          .product__info {
            width: 340px;
            flex-grow: 1;
          }
          .delete-btn {
            flex-shrink: 0;
            width: 20px;
            height: 20px;
            font-size: 20px;
            color: #979797;
            cursor: pointer;
            visibility: hidden;
          }

          .delete-btn:hover {
            color: #4d63ec;
          }
          &:hover {
            background-color: #f1f4f9;
            .delete-btn {
              visibility: visible;
            }
          }
        }
      }
    }
  }
}
</style>
