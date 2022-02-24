<!--
 * @Author: 杨珂
 * @Date: 2021-05-20 15:01:28
 * @LastEditTime: 2021-05-21 16:21:35
 * @LastEditors: 杨珂
 * @Description: 
 * @FilePath: \fant-template\src\components\data-list-view\DataListView.vue
 * 记得注释
-->
<template>
  <div class="list-view">
    <div class="toolbar" v-if="selectable">
      <div class="selected-btn" type="info" :closable="false">
        <span>已选中</span>
        <span class="num">{{ internalSelected.length }}</span>
        <span>行</span>
        <el-button type="text" @click="doCancel()">取消选中</el-button>
      </div>
      <slot name="actions" :selected="internalSelected"></slot>
      <div class="icons">
        <slot name="icons"></slot>
      </div>
    </div>
    <div class="table-container">
      <!-- 列表设置按钮 -->
      <el-popover class="table-setting" placement="bottom" width="200" trigger="click" v-loading>
        <div class="table-setting-header">
          <span>列表设置</span>
          <el-button type="text" @click="doInit">重置</el-button>
        </div>
        <el-tree
          :props="defaultProps"
          ref="tree"
          :default-checked-keys="tableConfig.listConfigs.filter(val => val.visible).map(val => val.prop)"
          node-key="prop"
          :data="
            tableConfig.listConfigs.map(val => {
              val.children = null;
              return val;
            })
          "
          draggable
          show-checkbox
          :allow-drop="
            (draggingNode, dropNode, type) => {
              return type !== 'inner';
            }
          "
          @node-drag-start="handleDropStart"
          @check-change="handleCheckChange"
          @node-drop="handleDrop"
        >
          <div class="render-row" slot-scope="{ data }">
            <div>{{ data.label }}</div>
            <div>
              <svg-icon
                @click="doChangeFiexd(data, fixedEnum.left)"
                :class="{ leftFixed: true, active: data.fixed === fixedEnum.left }"
                name="fixed"
              ></svg-icon>
              <svg-icon
                @click="doChangeFiexd(data, fixedEnum.right)"
                :class="{ rightFixed: true, active: data.fixed === fixedEnum.right }"
                name="fixed"
              ></svg-icon>
            </div>
          </div>
        </el-tree>
        <i slot="reference" class="iconfont ic-ui-setting"></i>
      </el-popover>
      <!-- 列表 -->
      <el-table
        ref="table"
        fit
        highlight-current-row
        header-row-class-name="list-view-table"
        :data="tableConfig.list"
        :row-key="rowKey"
        :stripe="stripe"
        :emptyText="emptyText"
        :default-sort="internalDefaultSort"
        @selection-change="doSelectionChange"
        @sort-change="doSortChange"
      >
        <el-table-column
          v-if="selectable"
          type="selection"
          :selectable="checkSelectable"
          :reserve-selection="reserveSelection"
        ></el-table-column>
        <el-table-column
          v-for="(columnData, key) in tableConfig.listConfigs.filter(val => val.visible)"
          :key="key"
          header-align="center"
          align="center"
          :width="columnData.width"
          :fixed="columnData.fixed"
          :prop="columnData.prop"
          :label="columnData.label"
        >
          <template slot-scope="scope">
            <!-- 类型 slot -->
            <slot v-if="columnData.type === dataTypeEnum.slot" :name="columnData.prop" :scope="scope"></slot>

            <!-- 类型 html 富文本-->
            <div v-else-if="columnData.type === dataTypeEnum.html" v-html="columnData.format(scope)"></div>
            <!-- 类型 html 图片-->
            <el-image
              v-else-if="columnData.type === dataTypeEnum.image"
              style="width: 80px; height: 80px"
              :src="scope.row[columnData.prop]"
              fit="cover"
            ></el-image>
            <!-- 默认类型 或者 类型string -->
            <div v-else>{{ columnData.format ? columnData.format(scope) : scope.row[columnData.prop] }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="tableConfig.operate" label="操作" width="200" fixed="right">
          <template slot-scope="scope">
            <slot name="operate" :scope="scope"></slot>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>{{ tableConfig }}</div>
    <!-- 分页 -->
    <el-pagination
      class="pagination"
      :layout="paginationConfig.layout"
      v-if="pageable"
      :current-page.sync="internalPage"
      :page-sizes="paginationConfig.pageSizes"
      :page-size="queryParam.limit"
      :total="tableConfig.total"
      @size-change="doSizeChange"
      @current-change="doPageChange"
    >
    </el-pagination>
  </div>
</template>
<script lang="ts" src="./DataListView.ts"></script>
<style lang="scss" scoped>
.table-container {
  position: relative;
  .table-setting {
    position: absolute;
    right: 5px;
    top: 10px;
    width: 24px;
    height: 24px;
    z-index: 99;
    i {
      font-size: 24px;
      cursor: pointer;
    }
  }
}
.el-tree {
  /deep/ .is-leaf {
    display: none;
  }
}
.table-setting-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.render-row {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .svg-icon {
    color: #ddd;
    &.leftFixed {
      transform: rotateY(180deg);
    }
    &.active {
      color: #333;
    }
  }
}

.list-view {
  .toolbar {
    display: flex;
    align-items: center;
    padding-bottom: 10px;
  }
  .selected-btn {
    flex: 0 0 auto;
    color: #4c5f7d;
    width: auto;
    display: inline-block;
    margin-right: 10px;
    padding: 4px 12px;
    font-size: $--button-small-font-size;
    /deep/ .el-button--text {
      padding: 0;
      margin-left: 5px;
    }
  }
  .num {
    color: $--color-primary;
    margin: 0 5px;
  }
  .pagination {
    height: 56px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
.list-view-table {
  background-color: #ffffff;
  th {
    background-color: #ffffff;
  }
}
</style>
