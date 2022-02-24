/*
 * @Author: 徐庆凯
 * @Date: 2021-02-19 16:33:37
 * @LastEditTime: 2021-04-19 14:25:37
 * @LastEditors: 徐庆凯
 * @Description: API封装示例
 * @FilePath: \fant-template\src\http\example\ExampleApi.ts
 * 记得注释
 */
import ApiClient from "@/http/ApiClient";
import BaseResponse from "@/model/common/BaseResponse";
import ListModel from "@/model/example/ListModel";
import LoginModel from "@/model/login/LoginModel";
import UserInfo from "@/model/login/UserInfo";

export default class ExampleApi {
  /**
   * 登录
   * @param body 登录请求体
   */
  static login(body: LoginModel): Promise<BaseResponse<UserInfo>> {
    return ApiClient.server()
      .post("/example/login", body, {})
      .then(res => {
        return res.data;
      });
  }
  /**
   * 查询单据列表
   */
  static getList(applyDate: string): Promise<BaseResponse<ListModel[]>> {
    return ApiClient.server()
      .post("/example/getList", { applyDate: applyDate }, {})
      .then(res => {
        return res.data;
      });
  }
  /**
   * 查询商品单据列表
   */
  static getSkuList(applyDate: string): Promise<BaseResponse<ListModel[]>> {
    return ApiClient.server()
      .post("/example/getSkuList", { applyDate: applyDate }, {})
      .then(res => {
        return res.data;
      });
  }

  /**
   * 获取账户
   * 获取账户
   *
   * @param tenant 租户id
   * @param owner 拥有者id
   * @param type 账户类型,
   */
  static get(tenant: string, owner: string, type: string): Promise<any> {
    return ApiClient.server()
      .get(`aas/v1/${tenant}/account/get`, {
        params: {
          owner: owner,
          type: type
        }
      })
      .then(res => {
        return res.data;
      });
  }
}
