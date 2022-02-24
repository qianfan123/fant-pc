/*
 * @Author: 杨珂
 * @Date: 2021-05-21 15:16:47
 * @LastEditTime: 2021-05-21 15:53:39
 * @LastEditors: 杨珂
 * @Description:
 * @FilePath: \fant-template\src\components\data-list-view\TableConfig.ts
 * 记得注释
 */

// 数据类型
export enum DataTypeEnum {
  string = "string", //字符串
  html = "html", // 富文本
  slot = "slot", //插槽
  image = "image" //图片
}
// 固定位置
export enum FixedEnum {
  left = "left", //左边
  right = "right" //右边
}

export interface ListConfigItem {
  label: string; //列标题
  prop: string; // 渲染字段名称
  type?: DataTypeEnum; //数据类型
  width: Nullable<string>; //列宽度
  visible: boolean; // 是否可见
  fixed: Nullable<FixedEnum>; //固定位置
  format?: Nullable<(param: any) => any>; //数据格式自定义
}

export default class TableConfig {
  name: Nullable<string> = null; //表格名字
  list: Nullable<any[]> = null; //列表数据
  total: Nullable<number> = 0; // 列表行总数
  operate?: Nullable<boolean> = false; //是否显示操作列
  listConfigs: ListConfigItem[] = [];
}
