/*
 * @Author: 杨珂
 * @Date: 2021-08-10 15:13:51
 * @LastEditTime: 2021-08-11 11:37:19
 * @LastEditors: 杨珂
 * @Description:
 * @FilePath: \fant-template\src\views\DialogCmp\DialogTransfer\cmp\TransferDialog.ts
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

//TODO  ListModel具体实现时替换具体数据模型 已选列表
class TransferListModel extends ListModel {
  isSel: boolean = false;
}

@Component({
  name: "TransferDialog"
})
export default class TransferDialog extends Vue {
  @Prop({ type: Boolean }) visible: boolean;
  @Prop({ type: Array }) selectedList: TransferListModel[]; // 已选列表
  @Prop({ type: Array }) excludeList: TransferListModel[]; // 排除列表
  @Prop({ type: Boolean }) required: boolean;
  @Prop({ type: Number }) maxCount: number;
  @Prop({ type: String, default: "选择列表项" }) title: string; //弹框标题

  rowData: TransferListModel[] = []; // 列表
  rowTotal: Nullable<number> = 0;

  page: number = 1;
  pageSize: number = 20;
  filterParams: FilterParams = new FilterParams();

  $refs: any;
  options = statusEnums;

  //未选择列表
  get unSelList() {
    return this.rowData.filter(val => val.isSel === false);
  }
  //已选择列表
  get selList() {
    return this.rowData.filter(val => val.isSel === true);
  }

  //清空全部
  doClearAllSel() {
    for (const value of this.rowData) {
      value.isSel = false;
    }
  }
  //未选择列表点击
  doListRowClick(row: any) {
    row.isSel = !row.isSel;
  }

  mounted() {
    this.doSearch();
  }

  doConfirm() {
    if (this.required && this.selList.length === 0) {
      return this.$message.warning(`请${this.title}`);
    }
    if (this.maxCount && this.selList.length > this.maxCount) {
      return this.$message.warning(`${this.title}个数不能超过${this.maxCount}个`);
    }
    this.controller.ok(this.selList);
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
        start: 0, //TODO
        limit: 100, //TODO 根据实际情况替换  部分项目  start:0 limit:0 为获取全部数据
        filters: [], // 穿梭框的筛选改为前端筛选
        sorters: [{ direction: "asc", property: "code" }],
        fetchParts: []
      }
    );

    ExampleApi.getList(params)
      .then(resp => {
        // 根据传入选中列表初始化列表状态
        this.rowData = (resp.data || []).map(resVal => {
          if (this.selectedList.find(val => val.uuid === resVal.uuid)) {
            return { ...resVal, ...{ isSel: true } };
          } else {
            return { ...resVal, ...{ isSel: false } };
          }
        });

        this.rowTotal = resp.total;
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
}
