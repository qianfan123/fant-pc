/*
 * @Author: 杨珂
 * @Date: 2021-08-09 14:29:32
 * @LastEditTime: 2021-08-10 15:23:40
 * @LastEditors: 杨珂
 * @Description:
 * @FilePath: \fant-template\src\views\DialogCmp\DialogSel\DialogSel.ts
 * 记得注释
 */
import { Component, Vue } from "vue-property-decorator";
import PageWrapper from "@/components/page-wrapper/PageWrapper.vue";
import DetailView from "@/components/detail-view/DetailView.vue";
import ListView from "@/components/list-view/ListView.vue";
import DetailCard from "@/components/detail-card/DetailCard.vue";
import SelListDialog from "./cmp/SelListDialog.vue";
import ListModel from "@/model/example/ListModel";

@Component({
  components: { PageWrapper, DetailView, DetailCard, ListView }
})
export default class DialogSel extends Vue {
  selList: ListModel[] = [];

  /**
   * 选择列表
   */
  doShowSelList() {
    const propsData = Object.assign({ selectedList: this.selList, maxCount: 10, required: true });
    this.$dialog.show(SelListDialog, propsData).then((res: any) => {
      console.log(res);
      if (!res.wasCanceled && res.output) {
        this.selList = res.output;
      }
    });
  }
}
