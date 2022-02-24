/*
 * @Author: 徐庆凯
 * @Date: 2021-02-19 16:33:37
 * @LastEditTime: 2021-08-09 16:53:13
 * @LastEditors: 杨珂
 * @Description:
 * @FilePath: \fant-template\src\mock\mock.ts
 * 记得注释
 */
import Mock from "mockjs";
import BaseResponse from "@/model/common/BaseResponse";
import ListModel from "@/model/example/ListModel";
import UserInfo from "@/model/login/UserInfo";
import { CommonUtil } from "fant-ui";

const Random = Mock.Random;
const baseUrl = process.env.VUE_APP_BASEURL;

/**
 * 使用mockjs进行拦截请求模拟数据，具体使用方法可至http://mockjs.com/进行查看
 */

/**
 * 登录
 */
const login = function() {
  const resp = new BaseResponse();
  const data: UserInfo = new UserInfo();
  data.linkMan = Random.cname();
  // 签名
  data.token = CommonUtil.uuid();
  // 登录用户名
  data.loginId = Random.natural();
  // 用户昵称
  data.nickName = Random.cname();
  // 用户手机号码
  data.mobile = Random.natural();
  // 联系方式
  data.linkMan = Random.natural();
  // 状态，ENABLE：启用、DISABLE：停用
  data.state = Random.natural();
  resp.code = 200;
  resp.data = data;
  resp.fields = "你嘿嘿嘿嘿嘿";
  resp.more = true;
  resp.msg = "事实上事实上";
  resp.success = true;
  resp.total = Random.natural(60, 100);
  return resp;
};

/**
 * 获取基础单据列表
 */
const getList = function() {
  const resp = new BaseResponse();
  const list: ListModel[] = [];
  for (let i = 0; i < 10; i++) {
    const item: ListModel = new ListModel();
    item.uuid = Random.string("number", 10);
    item.appId = Random.string("number", 10);
    item.consignee = Random.string("number", 10);
    item.created = Random.string("number", 10);
    item.flowNo = Random.string("number", 10);
    item.memberInfo = Random.string("number", 10);
    item.realAmount = Random.string("number", 10);
    item.sysState = Random.string("number", 10);
    item.type = Random.string("number", 10);
    list.push(item);
  }
  resp.code = 200;
  resp.data = list;
  resp.fields = "你嘿嘿嘿嘿嘿";
  resp.more = true;
  resp.msg = "事实上事实上";
  resp.success = true;
  resp.total = Random.natural(60, 100);
  return resp;
};

/**
 * 获取商品列表
 */
const getSkuList = function() {
  const resp = new BaseResponse();
  const list: ListModel[] = [];
  for (let i = 0; i < 10; i++) {
    const item: ListModel = new ListModel();
    item.appId = "https://img.yzcdn.cn/vant/cat.jpeg";
    item.consignee = Random.string("number", 10);
    item.created = Random.string("number", 10);
    item.flowNo = Random.string("number", 10);
    item.memberInfo = Random.string("number", 10);
    item.realAmount = Random.string("number", 10);
    item.sysState = Random.string("number", 10);
    item.type = Random.string("number", 10);
    list.push(item);
  }
  resp.code = 200;
  resp.data = list;
  resp.fields = "你嘿嘿嘿嘿嘿";
  resp.more = true;
  resp.msg = "事实上事实上";
  resp.success = true;
  resp.total = Random.natural(60, 100);
  return resp;
};
Mock.setup({
  timeout: "800-1200" // 表示响应时间介于 200 和 600 毫秒之间，默认值是'10-100'。
});
Mock.mock(/\/example\/getList/, getList);
Mock.mock(/\/example\/getSkuList/, getSkuList);
Mock.mock(/\/example\/login/, login);
