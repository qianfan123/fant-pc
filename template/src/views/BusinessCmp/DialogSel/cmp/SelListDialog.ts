/*
 * @Author: 杨珂
 * @Date: 2021-08-09 14:47:44
 * @LastEditTime: 2021-08-10 10:48:44
 * @LastEditors: 杨珂
 * @Description:
 * @FilePath: \fant-template\src\views\DialogCmp\DialogSel\cmp\SelListDialog.ts
 * 记得注释
 */
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import ExampleApi from "@/http/example/ExampleApi";
import ListModel from "@/model/example/ListModel";
import FilterParam from "@/model/common/FilterParam";
import { isValidKey } from "@/utils/Index";
// 状态枚举 //TODO 实际实现时替换
enum statusEnums {
  ONE = "状态一",
  TWO = "状态二",
  THREE = "状态三"
}
//TODO 实际实现时替换
class FilterParams {
  "keyword:%=%": Nullable<string> = null;
  "status:=": Nullable<statusEnums> = null;
}

@Component({
  name: "SelListDialog"
})
export default class SelListDialog extends Vue {
  @Prop({ type: Boolean }) visible: boolean;
  @Prop({ type: Boolean, default: true }) showSelected: boolean; // 显示已选列表
  @Prop({ type: Array }) selectedList: ListModel[]; //TODO 具体实现时替换具体数据模型 已选列表
  @Prop({ type: Array }) excludeList: ListModel[]; //TODO 具体实现时替换具体数据模型 排除列表
  @Prop({ type: Boolean }) required: boolean;
  @Prop({ type: Number }) maxCount: number;
  @Prop({ type: String, default: "选择列表项" }) title: string; //弹框标题

  rowData: ListModel[] = []; // TODO 具体实现时替换具体数据模型
  rowTotal: Nullable<number> = 0;

  page: number = 1;
  pageSize: number = 20;
  filterParams: FilterParams = new FilterParams();

  $refs: any;
  internalSelected: ListModel[] = []; // TODO 具体实现时替换具体数据模型
  suppressSelectionChange: boolean = false;
  options = statusEnums;

  @Watch("selectedList", { immediate: true })
  selectedListChanged() {
    this.internalSelected = this.selectedList ? [...this.selectedList] : [];
  }

  @Watch("internalSelected", { immediate: true, deep: true })
  internalSelectedChanged() {
    this.refreshRowSelected();
  }

  mounted() {
    this.doSearch();
  }

  // 判断是否多选  // TODO 具体实现时替换具体数据模型
  selectable(row: ListModel) {
    return !(this.excludeList && this.excludeList.find(value => value.uuid === row.uuid) != null);
  }

  // 列表勾选选项事件 // TODO 具体实现时替换具体数据模型
  handleSelectionChange(e: ListModel[]) {
    if (this.suppressSelectionChange) {
      return;
    }
    const internalSelected = [...this.internalSelected];
    for (const item of this.rowData) {
      const itemIndex = internalSelected.findIndex(row => {
        const target = e.find(selectItem => {
          return selectItem.uuid === item.uuid;
        });
        return row.uuid === item.uuid && !target;
      });
      if (itemIndex >= 0) {
        internalSelected.splice(itemIndex, 1);
      }
    }

    e.forEach(item => {
      const target = this.internalSelected.find(value => value.uuid === item.uuid);
      if (!target) {
        internalSelected.push(Object.assign({}, item));
      }
    });
    this.internalSelected = internalSelected;
  }

  doConfirm() {
    if (this.required && this.internalSelected.length === 0) {
      return this.$message.warning(`请${this.title}`);
    }
    if (this.maxCount && this.internalSelected.length > this.maxCount) {
      return this.$message.warning(`${this.title}个数不能超过${this.maxCount}个`);
    }
    this.controller.ok(this.internalSelected);
  }
  // 重置
  doReset() {
    this.filterParams = new FilterParams();
    this.doSearch();
  }
  doSearch(page: number = 1) {
    this.page = page || 1;
    const params: any = Object.assign(
      {},
      {
        start: (this.page - 1) * this.pageSize,
        limit: this.pageSize,
        filters: [],
        sorters: [{ direction: "asc", property: "code" }],
        fetchParts: []
      }
    );
    for (const key in this.filterParams) {
      const obj: FilterParam = new FilterParam();
      obj.property = key;
      if (!isValidKey(key, this.filterParams)) {
        // 先进行判断，之后就不会报错了
        throw Error("对象中不存在此key");
      }
      obj.value = this.filterParams[key];
      //值为空则不添加到过滤对象中
      if (
        (typeof obj.value === "string" && obj.value) ||
        typeof obj.value === "boolean" ||
        (typeof obj.value === "object" && obj.value && obj.value.length > 0)
      ) {
        params.filters.push(obj);
      }
    }
    ExampleApi.getList(params)
      .then(resp => {
        console.log(resp);
        this.suppressSelectionChange = true;
        this.rowData = resp.data || [];
        this.rowTotal = resp.total;
        if (this.$refs.table) {
          this.$refs.table.bodyWrapper.scrollTop = 0;
        }
        this.$nextTick(() => {
          this.refreshRowSelected();
        });
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  // 根据已选列表初始化分页列表勾选状态
  refreshRowSelected() {
    const table: any = this.$refs.table;
    this.suppressSelectionChange = true;
    this.rowData.forEach(row => {
      const selected = this.internalSelected.find(item => row.uuid === item.uuid);
      table.toggleRowSelection(row, !!selected);
    });
    this.suppressSelectionChange = false;
  }
}
