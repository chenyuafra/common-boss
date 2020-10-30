<template>
  <div class="container">
    <div class="cont_box">
      <el-form :model="form" :rules="rules" label-width="100px">
        <el-form-item label="菜单名称：">
          <span>{{form.menuName}}</span>
        </el-form-item>
        <el-form-item label="链接地址：" prop="url">
          <el-input v-model="form.url" style="width: 350px;"></el-input>
        </el-form-item>
        <el-form-item label="排序：" prop="sort">
          <el-input v-model="form.sort" style="width: 350px;"></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" plain @click="goback">返回</el-button>
          <el-button type="primary" @click="submitMenu">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import { apiMenuView,apiMenuEdit } from '@/api/request.js';
  export default {
    name: '',
    data() {
      return {
        form: {
          url: '',
          sort:'',
          menuName:''
        },
        rules:{
          url: [{
            required: true,
            message: '请输入路由地址',
            trigger: 'blur'
          }],
          scort: [{
            pattern:/^[1-9]+$/,
            message: '请输入数字格式',
            trigger: 'blur'
          }],
        }
      }
    },
    // 模板渲染前钩子函数
    created() {
      this.getMeunDetail();
    },
    // 模板渲染后钩子函数
    mounted() {

    },
    methods: {
      getMeunDetail(){
        let params={
          menuId:this.$route.query.menuId,
        }
        apiMenuView(params).then(res =>{
          this.form=res;
        });
      },
      // 提交
      submitMenu(){
        let params={
          menuId:this.$route.query.menuId,
          url:this.form.url,
          sort:this.form.sort
        }
        apiMenuEdit(params).then(res =>{
          this.$router.go(-1);
        })
      },
      // 返回
      goback(){
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
  .container {
    background: #fff;
  }
  .cont_box {
    padding: 20px;
  }
</style>
