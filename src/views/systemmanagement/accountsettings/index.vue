<template>
  <div class="container">
    <div class="p20 bgfff">
      <el-button size="medium" type="primary" @click="submit('form')">保存</el-button>
    </div>
    <div class="p20 bgfff" style="margin-top: 20px;">
      <el-form :model="form" :rules="rules" ref="form" label-width="120px">
        <el-form-item label="密码:" prop="password">
          <el-input v-model="form.password" type="password" maxlength="20" class="w350"></el-input>
        </el-form-item>
        <el-form-item label="新密码:" prop="newPassword">
          <el-input v-model="form.newPassword" type="password" maxlength="20" class="w350"></el-input>
        </el-form-item>
        <el-form-item label="确认秘密:" prop="confirmPassword">
          <el-input v-model="form.confirmPassword" type="password" maxlength="20" class="w350"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import { changePassword,logout } from '@/api/request.js';
  export default {
    name: '',
    data() {
      var confirmPasswordRules = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.form.newPassword) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        form: {
          password: '',
          newPassword: '',
          confirmPassword: ''
        },
        rules: {
          password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }],
          newPassword: [{
            required: true,
            message: '请输入新密码',
            trigger: 'blur'
          }],
          confirmPassword: [{
            required: true,
            validator: confirmPasswordRules,
            trigger: 'blur'
          }]
        }
      }
    },
    // 模板渲染前钩子函数
    created() {

    },
    // 模板渲染后钩子函数
    mounted() {

    },
    methods: {
      // 提交
      submit(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            let params={
              password:this.form.password,
              newPassword:this.form.newPassword,
              confirmPassword:this.form.confirmPassword
            }
            changePassword(params).then(res =>{
              this.$message.success('修改密码成功！')
              let params={
                userId:this.$store.state.userId
              }
              logout(params).then(res => {
                this.$store.commit('del_token');
                this.$store.commit('del_name');
                this.$store.commit('del_userId');
                this.$router.push('/login');
              })
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    },
  }
</script>
<style scoped>
  .popbox>>>.el-dialog__body {
    padding: 0 20px;
  }
</style>
