/*
 * @Author: 徐庆凯
 * @Date: 2021-04-16 10:22:40
 * @LastEditTime: 2021-04-19 14:09:50
 * @LastEditors: 徐庆凯
 * @Description: 用户登录模型
 * @FilePath: \fant-template\src\model\login\UserInfo.ts
 * 记得注释
 */
export default class UserInfo {
  // 签名
  token: Nullable<string> = null;
  // 登录用户名
  loginId: string = "";
  // 用户昵称
  nickName: Nullable<string> = null;
  // 用户手机号码
  mobile: Nullable<string> = null;
  // 联系方式
  linkMan: Nullable<string> = null;
  // 状态，ENABLE：启用、DISABLE：停用
  state: string = "";
}
