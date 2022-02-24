/*
 * @Author: 徐庆凯
 * @Date: 2021-04-14 19:18:05
 * @LastEditTime: 2021-04-21 11:31:11
 * @LastEditors: 徐庆凯
 * @Description: 基础列表
 * @FilePath: \fant-template\src\views\BasicList\BasicList.ts
 * 记得注释
 */
import { Component, Vue } from "vue-property-decorator";
import BasicLayout from "@/layouts/BasicLayoutSingle/BasicLayout.vue";
import PageWrapper from "@/components/page-wrapper/PageWrapper.vue";
import QueryCondition from "@/components/query-condition/QueryCondition.vue";
import ListView from "@/components/list-view/ListView.vue";
import ExampleApi from "@/http/example/ExampleApi";
import ListModel from "@/model/example/ListModel";

@Component({
  components: {
    BasicLayout,
    PageWrapper,
    QueryCondition,
    ListView
  }
})
export default class BasicList extends Vue {
  $refs: any;
  applyDate: string = ""; // 申请日期
  orderDataList: ListModel[] = []; // 订单列表
  orderTotal: number = 0; // 单据总数
  loading: boolean = true; // 数据是否正在加载

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
        this.orderDataList = resp.data;
        this.orderTotal = resp.total;
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
