<template>
  <div class="container">
    <div class="p20 bgfff">
      <el-button size="medium" type="primary" @click="submit('form')">保存</el-button>
      <el-button size="medium" @click="go_back">返回</el-button>
    </div>
    <div class="p20 bgfff" style="margin-top: 20px;">
      <el-form :model="form" :rules="rules" ref="form" label-width="120px">
        <el-form-item label="公司名称:" prop="companyName">
          <el-input v-model="form.companyName" maxlength="20" disabled class="w350"></el-input>
        </el-form-item>
        <el-form-item label="联系人:">
          <el-input v-model="form.contacts" maxlength="20" class="w350"></el-input>
        </el-form-item>
        <el-form-item label="联系电话:" prop="mobile">
          <el-input v-model="form.mobile" maxlength="20" class="w350"></el-input>
        </el-form-item>
        <el-form-item label="登录名:" prop="username">
          <el-input v-model="form.username" disabled maxlength="20" class="w350"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input v-model="form.password" type="password" maxlength="20" class="w350"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import { companyEdit,companyView } from '@/api/request.js';
  export default {
    name: '',
    data() {
      return {
        form: {
          companyName: '',
          contacts: '',
          mobile: '',
          username: '',
          password: ''
        },
        rules: {
          companyName: [{
            required: true,
            message: '请输入公司名称',
            trigger: 'blur'
          }],
          username: [{
            required: true,
            message: '请输入登录名',
            trigger: 'blur'
          },{
            pattern:/^[a-zA-Z0-9]+$/,
            message: '输入登录名格式有误',
            trigger: 'blur'
          }],
          password: [{
            pattern:/^[a-zA-Z0-9]+$/,
            message: '输入密码格式有误',
            trigger: 'blur'
          }],
          mobile: [{
            pattern:/^[0-9]+$/,
            message: '输入联系电话格式有误',
            trigger: 'blur'
          }]
        }
      }
    },
    // 模板渲染前钩子函数
    created() {
      this.getDetail();
    },
    // 模板渲染后钩子函数
    mounted() {

    },
    methods: {
      // 获取详情
      getDetail(){
        let params={
          companyId:this.$route.query.companyId
        }
        companyView(params).then(res =>{
          this.form=res;
          this.form.password=res.password?res.password:'';
          this.form={...this.form}
        })
      },
      // 提交
      submit(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            let params={
              contacts:this.form.contacts,
              mobile:this.form.mobile,
              password:this.form.password,
              companyId:this.$route.query.companyId
            }
            companyEdit(params).then(res =>{
              this.$router.go(-1);
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      go_back() {
        this.$confirm('您确定要返回吗？建议先保存', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.go(-1);
        }).catch(() => {

        });
      }
    },
  }
</script>
<style scoped>
  .popbox>>>.el-dialog__body {
    padding: 0 20px;
  }
</style>
