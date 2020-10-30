<template>
  <div class="container">
    <el-container>
      <!-- <el-header style="height:80px;">
        <el-row type="flex" justify="space-between" align="middle" style="width: 1200px;margin:0 auto;">
          <el-col :span="24" class="topbar-wrap">
            <img src="../assets/top_logo.png" style="width:115px;height:42px;" alt="" />
            <div class="topbar-logos">供应链系统</div>
          </el-col>
        </el-row>
      </el-header> -->
      <el-main>
        <el-card class="login_box">
          <el-row>
            <el-col :span="14" style="text-align: center;">
              <div style=" letter-spacing: 4.53px;color: #017FC5; font-size: 34px; text-align: center; margin-top: 80px; margin-bottom: 46px;">后台通用模板
              </div>
            </el-col>
            <el-col :span="10" class="right_box">
              <el-form :model="form" :rules="rules" ref="form">
                <h1 style="font-size:20px;color: #333;width:340px;margin:76px 0px 50px; font-weight: normal;">账户登录 >></h1>
                <el-form-item prop="username">
                  <el-input v-model.trim="form.username" prefix-icon="el-icon-mobile" placeholder="请输入用户名" maxlength="50"
                    clearable class="w340 input"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input v-model="form.password" prefix-icon="el-icon-lock" type="password" placeholder="请输入密码"
                    clearable class="w340 input"></el-input>
                </el-form-item>
                <el-form-item prop="imageCode">
                  <el-row type="flex" :gutter="4">
                    <el-col style="width: 254px;">
                      <el-input v-model.trim="form.imageCode" prefix-icon="el-icon-key" maxlength="4" placeholder="请输入图片验证码"
                        clearable class="w250"></el-input>
                    </el-col>
                    <el-col style="width: 88px;">
                      <el-image :src="imgcode" @click="updataCode" style="width: 88px;height: 40px;cursor: pointer;"
                        fit="fill"></el-image>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" class="w340" @click="submit('form')">登录</el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import {
    login,
    getImageCode
  } from '@/api/request.js';
  export default {
    name: '',
    data() {
      return {
        form: {
          username: '',
          password: '',
          imageCode: ''
        },
        imgcode: '',
        uuid: '',
        rules: {
          username: [{
            required: true,
            message: '请填写用户名',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '请填写密码',
            trigger: 'blur'
          }],
          imageCode: [{
            required: true,
            message: '请填写图形验证码',
            trigger: 'blur'
          }]
        }
      }
    },
    // 模板渲染前钩子函数
    created() {
      this.getImgCode();
      // 回车键登录
      let that = this;
      document.onkeydown = function(e) {
        e = window.event || e;
        if (that.$route.path == '/login' && (e.code == 'Enter' || e.code == 'enter')) { //验证在登录界面和按得键是回车键enter
          that.submit('form');
        }
      }
    },
    // 模板渲染后钩子函数
    mounted() {

    },
    methods: {
      // 提交
      submit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$store.commit('set_token', '123');
            // this.$store.commit('set_name', 'zhang');
            // this.$store.commit('set_userId', '111');
            this.$router.push('/home');
          }
        })
      }
    },
  }
</script>

<style scoped>
  .container {
    background-color: #409EFF;
    height: 840px;
  }

  .el-header {
    display: flex;
    align-items: center;
    padding: 0;
    user-select: none;
    background-color: #fff;
  }

  .topbar-wrap {
    margin-left: 30px;
  }

  .topbar-title {
    display: inline-block;
    vertical-align: middle;
    margin-left: 55px;
  }

  .topbar-logos {
    display: inline-block;
    vertical-align: middle;
    margin-left: 20px;
    font-size: 22px;
    color: #333;
    margin-top: -35px;
  }

  .login_box {
    width: 1200px;
    height: 520px;
    margin: 50px auto;
    overflow: hidden;
  }

  .w340 {
    width: 340px;
  }

  .w250 {
    width: 250px;
  }

  .right_box {
    border-left: 1px dashed #979797;
    display: flex;
    justify-content: center;
    height: 520px;
  }

  .login_box>>>.el-card__body {
    padding: 0;
  }
</style>
