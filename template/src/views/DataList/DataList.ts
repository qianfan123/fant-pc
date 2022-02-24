/*
 * @Author: 杨珂
 * @Date: 2021-05-20 15:05:18
 * @LastEditTime: 2021-05-21 16:49:36
 * @LastEditors: 杨珂
 * @Description:
 * @FilePath: \fant-template\src\views\DataList\DataList.ts
 * 记得注释
 */
import { Component, Vue } from "vue-property-decorator";
import BasicLayout from "@/layouts/BasicLayoutSingle/BasicLayout.vue";
import PageWrapper from "@/components/page-wrapper/PageWrapper.vue";
import QueryCondition from "@/components/query-condition/QueryCondition.vue";
import DataListView from "@/components/data-list-view/DataListView.vue";
import ExampleApi from "@/http/example/ExampleApi";
import ListModel from "@/model/example/ListModel";
//model
import TableConfig, { DataTypeEnum, FixedEnum, ListConfigItem } from "@/components/data-list-view/TableConfig";
@Component({
  components: {
    BasicLayout,
    PageWrapper,
    QueryCondition,
    DataListView
  }
})
export default class BasicList extends Vue {
  $refs: any;
  applyDate: string = ""; // 申请日期
  orderDataList: ListModel[] = []; // 订单列表
  orderTotal: number = 0; // 单据总数
  loading: boolean = true; // 数据是否正在加载
  tableConfig: TableConfig = {
    name: "数据列表",
    list: [],
    total: null,
    operate: true,
    listConfigs: [
      {
        label: "订单号",
        prop: "flowNo",
        type: DataTypeEnum.slot,
        visible: true,
        width: "200",
        fixed: null
      },
      {
        label: "订单状态",
        prop: "sysState",
        width: "200",
        visible: true,
        fixed: null,
        format: (scope: any) => {
          return `大饼${scope.row.sysState}`;
        }
      },
      {
        label: "订单类型",
        prop: "type",
        visible: true,
        width: "200",
        fixed: null
      },
      {
        label: "下单渠道",
        prop: "appId",
        visible: true,
        width: null,
        fixed: FixedEnum.left
      },
      {
        label: "客户信息",
        prop: "memberInfo",
        type: DataTypeEnum.image,
        visible: true,
        width: null,
        fixed: null
      }
    ]
  };

  mounted() {
    this.doSearch();
  }
  /**
   * 搜索按钮点击事件
   */
  doSearch() {
    this.loading = true;
    ExampleApi.getList(this.applyDate)
      .then(resp => {
        this.loading = false;
        this.tableConfig.list = resp.data;
        this.tableConfig.total = resp.total;
      })
      .catch(error => {
        this.loading = false;
      });
  }

  /**
   * 表格换页事件
   */
  doListLoad() {
    this.doSearch();
  }

  /**
   * 重置按钮事件
   */
  doReset() {
    this.$alert("这是一段内容", "标题名称", {
      type: "danger",
      confirmButtonText: "确定",
      callback: action => {
        this.$message({
          type: "info",
          message: `action: ${action}`
        });
        this.applyDate = "";
        this.$refs.orderDataList.reset();
      }
    });
  }

  /**
   * 查看详情点击事件
   * @param row
   */
  doOrderDtl(row: ListModel) {
    this.$router.push("/basicDetail");
  }
}
