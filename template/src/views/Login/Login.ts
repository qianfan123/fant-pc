/*
 * @Author: 徐庆凯
 * @Date: 2021-04-15 19:58:07
 * @LastEditTime: 2021-04-21 11:20:27
 * @LastEditors: 徐庆凯
 * @Description:
 * @FilePath: \fant-template\src\views\Login\Login.ts
 * 记得注释
 */
import ExampleApi from "@/http/example/ExampleApi";
import LoginModel from "@/model/login/LoginModel";
import UserInfo from "@/model/login/UserInfo";
import { Component, Vue, Watch } from "vue-property-decorator";
import { RouteConfig } from "vue-router";
import { Action } from "vuex-class";

@Component({
  components: {}
})
export default class Login extends Vue {
  @Action("userInfo") actionUserInfo: any;
  fetchImage: string = ""; // 验证码图片地址
  loginModel: LoginModel = new LoginModel(); // 登录表单绑定模型
  loading: boolean = false; // 是否正在登录
  autoLogin: boolean = false; // 是否自动登录
  tips: string = ""; // 登录错误提示信息
  redirect: string = ""; // 跳转路径

  @Watch("$route")
  onRouteChange(n: any) {
    const query = n.query;
    if (query) {
      this.redirect = query.redirect;
    }
  }

  // 登录按钮是否禁用
  get disabled() {
    if (this.loginModel.code && this.loginModel.password && this.loginModel.loginId) {
      return false;
    }
    return true;
  }

  mounted() {
    this.doFetchImage();
  }

  /**
   * 获取验证码图片地址
   */
  doFetchImage() {
    const host = process.env.VUE_APP_BASEURL;
    this.loginModel.requestId = String(new Date().getTime());
    this.loginModel.code = "";
    this.fetchImage = `${host}/uas/v1/sop/verificationCode/fetchImage?requestId=${this.loginModel.requestId}`;
  }

  doLogin() {
    this.loading = true;
    ExampleApi.login(this.loginModel)
      .then(resp => {
        this.loading = false;
        if (resp.data) {
          const userInfo: UserInfo = resp.data;
          this.actionUserInfo(userInfo);
          this.$router.push({ path: this.redirect || "/" });
        }
      })
      .catch(error => {
        this.loading = false;
      });
  }
}
