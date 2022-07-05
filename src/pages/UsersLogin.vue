<template>
  <div class="login-container">
    <div class="wrapper">
      <div class="login-header">
        <div class="logo-mi"></div>
        <div class="logo-info">
          <p class="logo-title">小米商城</p>
          <p class="logo-desc">让每个人都能xxxxxxx</p>
        </div>
      </div>
    </div>
    <div class="login-body">
      <div class="bg-img">
        <img src="../../public/imgs/login-bg.jpg" alt="" />
      </div>
      <div class="wrapper">
        <div class="login-form">
          <div class="dialog-header">
            <span>账号登录</span>
            <span>扫码登录</span>
          </div>
          <div class="dialog-content">
            <div class="input-box">
              <input type="text" placeholder="请输入账号" v-model="username" />
              <input type="password" placeholder="密码" v-model="password" />
            </div>
            <div class="btn-box">
              <a href="javaScript:;" class="btn" @click="login">登录</a>
            </div>
            <div class="tips">
              <div class="sms">手机短信登录/注册</div>
              <div class="reg" @click="register">
                立即注册 <span>|</span> 忘记密码？
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="login-footer">
      <div class="footer-link">
        <a href="javascript:;" target="_blank">简体</a> <span>|</span>
        <a href="javascript:;" target="_blank">繁体</a><span>|</span>
        <a href="javascript:;" target="_blank">English</a><span>|</span>
        <a href="javascript:;" target="_blank">常见问题</a><span>|</span>
        <a href="javascript:;" target="_blank">隐私政策</a>
      </div>
      <div class="copy-right">
        小米公司版权所有-京ICP备10046444-
        <span class="icon-jihun"></span>
        京公网安备11010802020134号-京ICP证110507号
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UsersLogin',
  data() {
    return {
      username: '',
      password: '',
      userId: ''
    }
  },
  methods: {
    login() {
      const { username, password } = this
      this.$http
        .post('/user/login', {
          username,
          password
        })
        .then((res) => {
          // console.log(res)
          // 将 userId 以 Cookie形式 保存
          this.$cookie.set('userId', res.id, { expires: 'Session' })
          // ToTo：保存用户名
          this.$store.dispatch('saveUserName', res.username)
          this.$router.push({
            name: 'ProductHome',
            params: {
              from: 'login'
            }
          })
        })
    },
    register() {
      this.$http
        .post('/user/register', {
          username: '一一',
          password: '000',
          email: 'xiaobai@qq.com'
        })
        .then(() => {
          this.$message.success('注册成功！')
          // this.$message.error('注册成功！')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixin.scss';
@import '@/assets/scss/config.scss';

.login-container {
  .wrapper {
    .login-header {
      @include flex(flex-start);
      height: 112px;
      line-height: 112px;
      .logo-mi {
        @include bgImg(53px, 53px, '/public/imgs/logo-mi.png');
        margin-right: 18px;
      }
      .logo-info {
        @include flex();
        flex-direction: column;
        .logo-title {
          line-height: 35px;
          margin-bottom: 8px;
          font-size: 33px;
          color: $colorB;
        }
        .logo-desc {
          line-height: 12px;
          color: $colorC;
          font-size: 10px;
        }
      }
    }
  }
  .login-body {
    position: relative;
    width: 1918px;
    height: 576px;
    margin: 0 auto;
    overflow: hidden;
    .bg-img {
      // background-color: pink;
      img {
        transform: translateX(-25%);
        height: 576px;
      }
    }
    .wrapper {
      position: absolute;
      top: 0;
      left: 0;
      .login-form {
        padding: 0 31px;
        // @include position(absolute, 37px, 500px, 410px, 510px);
        position: absolute;
        right: 0;
        top: 37px;
        height: 510px;
        background-color: $colorG;
        .dialog-header {
          height: 112px;
          font-size: $fontE;
          font-family: PingFang SC;
          @include flex(space-around);

          span {
            display: inline-block;
            flex: 1;
            color: $colorA;
            text-align: center;
            &:last-child {
              color: $colorC;
              border-left: 1px solid #d7d7d7;
            }
          }
        }
        .dialog-content {
          .input-box {
            input {
              height: 50px;
              width: 100%;
              margin-bottom: 20px;
              border: 1px solid #e5e5e5;
              padding-left: 18px;
              box-sizing: border-box;
              &::placeholder {
                color: $colorD;
              }
            }
          }
          .btn-box {
            margin-top: 10px;
            a {
              display: inline-block;
              width: 100%;
              height: 50px;
              line-height: 50px;
              font-size: $fontI;
            }
          }
        }
        .tips {
          margin-top: 15px;
          @include flex();
          font-size: $fontJ;
          cursor: pointer;
          .sms {
            color: $colorA;
          }
          .reg {
            color: $colorD;
          }
          span {
            margin: 0 7px;
          }
        }
      }
    }
  }

  .login-footer {
    // 开启BFC
    overflow: hidden;
    @include flex(flex-end);
    flex-direction: column;
    height: 391px;
    padding-bottom: 93px;
    box-sizing: border-box;
    font-size: $fontI;
    color: $colorD;
    .footer-link {
      width: 730px;
      text-align: center;
      margin-bottom: 10px;
      a {
        display: inline-block;
        line-height: 22px;
        padding: 0 10px;
        font-size: $fontI;
        color: $colorD;
        // border-right: 1px solid $colorD;
        // &:last-child {
        //   border: none;
        // }
      }
    }
    .copy-right {
      .icon-jihun {
        display: inline-block;
        @include bgImg(21px, 25px, '/public/imgs/jihun.png');
        vertical-align: middle;
      }
    }
  }
}
</style>
