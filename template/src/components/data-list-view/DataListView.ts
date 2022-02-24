/*
 * @Author: 杨珂
 * @Date: 2021-05-20 15:01:47
 * @LastEditTime: 2021-05-21 16:51:02
 * @LastEditors: 杨珂
 * @Description:
 * @FilePath: \fant-template\src\components\data-list-view\DataListView.ts
 * 记得注释
 */
import { Component, Vue, Prop, Watch, ModelSync } from "vue-property-decorator";
import { CommonUtil } from "fant-ui";

import TableConfig, { DataTypeEnum, FixedEnum, ListConfigItem } from "./TableConfig";
// 筛选参数
class FilterParam {
  // 查询条件运算,格式为“field:<操作符>”
  property: Nullable<string> = null;
  // 查询参数
  value: any;
}

// 排序参数
class SortParam {
  // 排序字段
  property: Nullable<string> = null;
  // 排序方式，默认倒叙
  direction: Nullable<string> = null;
}

// 查询参数
class QueryParam {
  // 开始位置
  start: number = 0;
  // 页面大小
  limit: number = 0;
  //
  filters: FilterParam[] = [];
  //
  sorters: SortParam[] = [];
  // 扩展信息
  fetchParts: string[] = [];
}

@Component({
  components: {}
})
export default class ListView extends Vue {
  @Prop({ type: Boolean, default: true }) selectable: boolean; // 是否显示勾选框
  @Prop({ type: Boolean, default: true }) pageable: boolean; // 是否显示分页
  @Prop({ type: Boolean, default: false }) stripe: boolean; // 是否斑马纹
  @Prop({ type: Number, default: 0 }) total: number; // 选项总数
  @Prop({ type: String, default: "" }) emptyText: string;
  @Prop() defaultSort: any; // 默认排序
  @Prop() rowKey: any; // 行id 配合reserve-selection使用
  @Prop({ type: Boolean, default: true }) reserveSelection: boolean; // 跨页选中
  @Prop({ type: Boolean, default: false }) smallPage: boolean;
  @Prop({ type: Boolean, default: false }) highlightCurrentRow: boolean;
  @Prop({
    type: Function,
    default: (row: any, index: number) => {
      return true;
    }
  })
  @Prop({ type: Function })
  checkSelectable: () => boolean; // checkbox是否可选

  @ModelSync("value", "input", { type: Object })
  tableConfig!: TableConfig;

  internalPage: number = 1;
  internalSelected: any[] = []; // 选中的对象数组
  internalDefaultSort: any = {};
  queryParam: QueryParam = new QueryParam();
  $refs: any;
  defaultProps: any = {
    children: "children",
    label: "label"
  };
  dragging: boolean = false; //是否拖拽中
  fixedEnum = FixedEnum; //列固定方式
  dataTypeEnum = DataTypeEnum; //数据类型

  // 分页器组件
  get paginationConfig() {
    if (this.smallPage) {
      return {
        layout: "jumper,prev,next,total",
        pageSizes: null
      };
    } else {
      return {
        layout: "sizes, total, prev, pager, next",
        pageSizes: [10, 30, 50, 100]
      };
    }
  }

  created() {
    if (this.defaultSort) {
      this.internalDefaultSort = {
        prop: this.defaultSort.property,
        order: this.defaultSort.direction === "ASC" ? "ascending" : "descending"
      };
      this.queryParam.sorters = [this.defaultSort];
    }
    this.queryParam.limit = 10;
    this.queryParam.start = (this.internalPage - 1) * this.queryParam.limit!;
  }
  /**
   * 列表控制显示隐藏
   * @param data
   * @param checked
   * @param indeterminate
   */
  handleCheckChange(data: ListConfigItem, checked: boolean, indeterminate: any) {
    // tree的节点拖拽后会改变选中状态  新增dragging  判断是否是拖拽导致的 是 则不改变选中状态
    data.visible = checked;
    if (this.dragging) {
      this.$refs.tree.setChecked(data.prop, data.visible);
      this.dragging = false;
    } else {
      data.visible = checked;
    }
  }
  /**
   *
   * @param dropNode 开始拖拽
   * @param ev
   */
  handleDropStart(dropNode: any, ev: any) {
    this.dragging = true;
  }
  /**
   *拖拽成功后回调
   * @param arr
   */
  handleDrop(draggingNode: any, dropNode: any, dropType: any, ev: any) {
    const draggingNodeIndex = this.tableConfig.listConfigs.findIndex(
      (val: ListConfigItem) => val.prop === draggingNode.data.prop
    );
    const dropNodeIndex = this.tableConfig.listConfigs.findIndex(
      (val: ListConfigItem) => val.prop === dropNode.data.prop
    );
    // 交换数据列表中的位置
    if (dropType === "before") {
      this.tableConfig.listConfigs.splice(dropNodeIndex, 0, draggingNode.data);
    } else if (dropType === "after") {
      this.tableConfig.listConfigs.splice(dropNodeIndex + 1, 0, draggingNode.data);
    }
    draggingNodeIndex > dropNodeIndex
      ? this.tableConfig.listConfigs.splice(draggingNodeIndex + 1, 1)
      : this.tableConfig.listConfigs.splice(draggingNodeIndex, 1);
  }
  /**
   * 改变列表列固定方式
   * @param data 列表配置项
   * @param type 固定类型
   */
  doChangeFiexd(data: ListConfigItem, type: FixedEnum) {
    data.fixed = data.fixed ? null : type;
  }
  /**
   * 初始化列表配置
   */
  doInit() {
    this.$emit("initListConfigs");
  }

  doSelectionChange(arr: any) {
    this.internalSelected = arr;
    this.$emit("selected", this.internalSelected);
  }

  /**
   * 表格排序
   */
  doSortChange({ column, prop, order }: any) {
    order === "ascending" ? (order = "ASC") : (order = "DESC");
    const sorts = [];
    column && prop && order && sorts.push({ property: prop, direction: order });
    this.internalPage = 1;
    this.queryParam.start = (this.internalPage - 1) * this.queryParam.limit!;
    this.queryParam.sorters = sorts;
    this.$emit("load", CommonUtil.copy(this.queryParam));
  }

  /**
   * 取消选中
   */
  doCancel() {
    this.$refs.table.clearSelection();
  }

  /**
   * 分页回调
   */
  doPageChange(page: number) {
    this.internalPage = page;
    this.queryParam.start = (this.internalPage - 1) * this.queryParam.limit;
    this.$emit("load", CommonUtil.copy(this.queryParam));
  }

  /**
   * 每页多少条change
   */
  doSizeChange(pageSize: number) {
    this.queryParam.limit = pageSize;
    this.reset();
  }

  search() {
    this.doCancel(); // 解决编辑已勾选数据后，internalSelected不改变的问题
    this.$emit("load", CommonUtil.copy(this.queryParam));
  }

  reset() {
    this.doCancel(); // 解决编辑已勾选数据后，internalSelected不改变的问题
    this.internalPage = 1;
    this.queryParam.start = (this.internalPage - 1) * this.queryParam.limit;
    this.$emit("load", CommonUtil.copy(this.queryParam));
  }
}
