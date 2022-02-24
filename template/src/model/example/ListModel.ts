/*
 * @Author: 杨珂
 * @Date: 2021-05-20 14:52:24
 * @LastEditTime: 2021-08-09 15:45:45
 * @LastEditors: 杨珂
 * @Description:
 * @FilePath: \fant-template\src\model\example\ListModel.ts
 * 记得注释
 */
export default class ListModel {
  //id
  uuid: Nullable<string> = null;
  // 订单号
  flowNo: string = "";
  // 订单状态
  sysState: string = "";
  // 订单类型
  type: string = "";
  // 下单渠道
  appId: string = "";
  // 客户信息
  memberInfo: string = "";
  // 收货人信息
  consignee: string = "";
  // 下单金额（元）
  realAmount: string = "";
  // 申请时间
  created: string = "";
}
