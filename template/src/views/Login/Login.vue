<!--
 * @Author: 徐庆凯
 * @Date: 2021-04-15 19:58:07
 * @LastEditTime: 2021-04-21 11:19:13
 * @LastEditors: 徐庆凯
 * @Description: 登录页面 
 * @FilePath: \fant-template\src\views\Login\Login.vue
 * 记得注释 
-->
<template>
  <div class="login">
    <div class="login-body">
      <div class="login-body-left"><img src="@/assets/img/common/img_login_chatu.png" /></div>
      <div class="login-body-right">
        <div class="login-body-right-header"><img src="@/assets/img/pic_logo.png" /></div>
        <el-form class="login-form" ref="loginForm" :model="loginModel" label-width="0">
          <el-form-item prop="loginId">
            <el-input
              ref="loginId"
              v-model="loginModel.loginId"
              prefix-icon="iconfont ic-ui-user"
              placeholder="请输入账户名"
              clearable
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              ref="password"
              v-model="loginModel.password"
              prefix-icon="iconfont ic-ui-lock"
              placeholder="请输入登录密码"
              type="password"
              clearable
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-input ref="code" v-model="loginModel.code" placeholder="请输入验证码">
              <template slot="suffix">
                <img class="login-form-checkCode" :src="fetchImage" @click="doFetchImage" />
              </template>
            </el-input>
          </el-form-item>
          <span class="login-form-tips">{{ tips }}</span>
          <el-checkbox class="login-form-auto" v-model="autoLogin">5天内自动登录</el-checkbox>
          <el-button
            :disabled="disabled"
            :loading="loading"
            type="primary"
            class="login-form-button"
            ref="login"
            @click="doLogin"
            >登录
          </el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./Login.ts"></script>
<style lang="scss" scoped>
.login {
  position: relative;
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  min-height: 600px;
  min-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("../../assets/img/common/img_login_bg.png");
  background-repeat: no-repeat;
  background-size: cover;
  &-body {
    height: 548px;
    width: 1000px;
    background: #ffffff;
    box-shadow: 0px 8px 40px 0px rgba(215, 223, 235, 0.36);
    border-radius: 8px;
    display: flex;
    &-left {
      width: 440px;
      height: 548px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-right {
      width: 560px;
      height: 548px;
      box-sizing: border-box;
      padding-top: 48px;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: #e7f1ff;
      border-radius: 0px 16px 16px 0px;
      .login-form {
        width: 360px;
        /deep/.el-input__inner {
          height: 48px;
          background: #ffffff;
          border-radius: 8px;
          border: 1px solid #d7dfeb;
        }
        /deep/.el-form-item:not(:last-of-type) {
          margin-bottom: 20px;
        }
        /deep/.el-form-item:last-of-type {
          margin-bottom: 8px;
        }
        /deep/.el-input__icon {
          font-size: 16px;
        }
        /deep/.el-input__prefix {
          top: 2px;
        }
        :-moz-placeholder {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #a1b0c8;
        }

        ::-moz-placeholder {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #a1b0c8;
        }

        ::-webkit-input-placeholder {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #a1b0c8;
        }

        :-ms-input-placeholder {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #a1b0c8;
        }
        &-button {
          width: 360px;
          height: 48px;
          background: #0074ff;
          box-shadow: 0px 4px 12px 0px rgba(0, 116, 255, 0.5);
          border-radius: 8px;
        }
        /deep/ .el-button--primary.is-disabled {
          background: #0074ff;
          box-shadow: none;
          border-radius: 8px;
          opacity: 0.3;
        }
        &-checkCode {
          width: auto;
          height: 48px;
          padding: 1px 0;
          margin-right: -4px;
          border-top-right-radius: 8px;
          border-bottom-right-radius: 8px;
        }

        &-tips {
          display: block;
          height: 20px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #de3232;
          line-height: 20px;
          margin-bottom: 18px;
        }
        &-auto {
          margin-bottom: 14px;
        }
      }
      &-header {
        height: 68px;
        font-size: 48px;
        margin-bottom: 36px;
      }
    }
  }
}
</style>
