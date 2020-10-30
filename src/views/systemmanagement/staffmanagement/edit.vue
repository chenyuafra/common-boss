<template>
  <div class="container">
    <div class="p20 bgfff">
      <el-button size="medium" type="primary" @click="submit('form')">保存</el-button>
      <el-button size="medium" @click="go_back">返回</el-button>
    </div>
    <div class="p20 bgfff" style="margin-top: 20px;">
      <el-form :model="form" :rules="rules" ref="form" label-width="90px">
        <h3 style="padding-bottom: 20px;">基本信息</h3>
        <el-form-item label="员工姓名:" prop="staffName">
          <el-input v-model="form.staffName" maxlength="20" class="w350"></el-input>
        </el-form-item>
        <el-form-item label="性别:">
          <el-select v-model="form.gender" placeholder="请选择" class="w350">
            <el-option label="男" value="MAN"></el-option>
            <el-option label="女" value="WOMAN"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门名称:" prop="departmentId">
          <el-select v-model="form.departmentId" placeholder="请选择" class="w350">
            <el-option v-for="item,i in BMList" :key="i" :label="item.dataMaintainName" :value="item.dataMaintainId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系电话:">
          <el-input v-model="form.mobile" maxlength="20" class="w350"></el-input>
        </el-form-item>
        <el-form-item label="邮箱地址:" prop="email">
          <el-input v-model="form.email" maxlength="50" class="w350"></el-input>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input v-model="form.remarks" maxlength="50" class="w350"></el-input>
        </el-form-item>
        <h3 style="padding-bottom: 20px;">登录信息</h3>
        <el-form-item label="登录名:" prop="username">
          <el-input v-model="form.username" maxlength="20" disabled class="w350"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input v-model="form.password" type="password" maxlength="20" class="w350"></el-input>
        </el-form-item>
        <el-form-item label="所属角色:" prop="roleIds">
          <el-checkbox-group v-model="form.roleIds">
            <el-checkbox v-for="item,i in rolesAll" :key="i" :label="item.roleId">{{item.roleName}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>
<script>
  import { staffView,staffEdit,dataMaintainchoice,rolesList } from '@/api/request.js';
  export default {
    name: '',
    data() {
      return {
        BMList:[],
        rolesAll:[],
        form: {
          staffName: '',
          gender: 'MAN',
          departmentId: '',
          mobile: '',
          email: '',
          remarks: '',
          username: '',
          password: '',
          roleIds:[]
        },
        rules: {
          staffName: [{
            required: true,
            message: '请输入员工姓名',
            trigger: 'blur'
          }],
          departmentId: [{
            required: true,
            message: '请选择部门名称',
            trigger: 'change'
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
          }],
          roleIds: [{
            required: true,
            message: '请选择所属角色',
            trigger: 'change'
          }],
          email: [{
            pattern: /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/,
            message: '邮箱格式不正确',
            trigger: 'blur'
          }]
        }
      }
    },
    // 模板渲染前钩子函数
    created() {
      this.getBM();
      this.getRolesList();
      this.getDetail();
    },
    // 模板渲染后钩子函数
    mounted() {

    },
    methods: {
      // 获取所有部门
      getBM(){
        let params={
          dataMaintainType:'DEPARTMENT_NAME'
        }
        dataMaintainchoice(params).then(res =>{
          this.BMList=res.typeDataList;
        })
      },
      // 获取所有角色列表
      getRolesList(){
        rolesList().then(res =>{
          this.rolesAll=res;
        })
      },
      // 获取详情
      getDetail(){
        let params={
          staffId:this.$route.query.staffId
        }
        staffView(params).then(res =>{
          this.form=res;
          this.form.gender=res.gender&&JSON.parse(res.gender).name;
        })
      },
      // 提交
      submit(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            let params={
              staffName:this.form.staffName,
              gender:this.form.gender,
              departmentId:this.form.departmentId,
              mobile:this.form.mobile,
              email:this.form.email,
              remarks:this.form.remarks,
              username:this.form.username,
              password:this.form.password,
              roleIds:this.form.roleIds,
              staffId:this.$route.query.staffId
            }
            staffEdit(params).then(res =>{
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
