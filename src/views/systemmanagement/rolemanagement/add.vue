<template>
  <div>
    <div class="p20 bgfff">
      <el-button size="medium" type="primary" @click="submitForm('form')">保存</el-button>
      <el-button size="medium" @click="go_back">返回</el-button>
    </div>
    <div class="detail">
      <el-form :model="form" label-width="120px" :rules="rules" ref="form">
        <el-row type="flex">
          <el-col :span="8">
            <el-form-item label="角色名称:" prop="roleName">
              <el-input v-model="form.roleName" maxlength="50" class="w350"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="8">
            <el-form-item label="描述:" prop="description">
              <el-input v-model="form.description" maxlength="50" class="w350"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="8">
            <el-form-item label="权限:" prop="menuIds">
              <div class="treeChoose">
                <el-tree :data="dataQList" show-checkbox node-key="menuId" :default-checked-keys="form.menuId"
                  ref="tree" highlight-current :props="defaultProps" @check-change="selectdata">
                </el-tree>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {
    roleAdd,
    functionPermission
  } from "@/api/request.js"
  export default {
    data() {
      return {
        form: {
          roleName: '',
          description: '',
          menuId: []
        },
        dataQList: [],
        defaultProps: {
          children: 'children',
          label: 'menuName'
        },
        rules: {
          roleName: [{
            required: true,
            message: '请输入名称',
            trigger: 'blur'
          }],
          menuId: [{
            required: true,
            message: '请设置角色权限',
            trigger: 'change'
          }],
        }
      }
    },
    created() {
      this.getQXList();
    },
    mounted() {

    },
    methods: {
      go_back() {
        this.$confirm('您确定要返回吗？建议先保存', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.go(-1);
        }).catch(() => {

        });
      },
      // 获取权限列表
      getQXList(){
        functionPermission().then(res =>{
          this.dataQList=res;
        })
      },
      // 提交
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {
              roleName: this.form.roleName,
              description: this.form.description,
              menuId: this.form.menuId
            }
            roleAdd(params).then(res => {
              this.$router.go(-1);
            });
          } else {
            return false;
          }
        });
      },
      //返回最后一级的id
      selectdata() {
        this.form.menuId=this.$refs.tree.getCheckedKeys();
      },
    },
  }
</script>

<style scoped="scoped">
  .addView {
    background-color: #FFFFFF;
    height: 82px;
    margin: 14px 0 1px 0;
    display: flex;
    align-items: center;
  }

  .title {
    height: 22px;
    font-size: 16px;
    font-weight: 500;
    margin: 30px;
  }

  .detail {
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #FFFFFF;
    padding: 20px 20px 1px 20px;
  }

  .treeChoose {
    border: #DDDDDD 1px solid;
    width: auto;
    padding: 10px 20px;
    background-color: #FFFFFF;
  }
</style>
