<template>
  <div class="container">
    <div style="width: 800px;">
    <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;" row-key="menuId" border default-expand-all :tree-props="{children: 'children',hasChildren: 'hasChildren'}">
      <el-table-column prop="menuName" label="名称" >
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
            <el-button  type="primary"  @click="go_edit(scope.row)" v-if="power.hasOwnProperty('修改')">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>

  </div>
</template>

<script>
  import{ apiMenuList,queryButton } from '@/api/request.js';
  export default {
    name: '',
    data() {
      return {
        tableData:[],
        power:{}
      }
    },
    // 模板渲染前钩子函数
    created() {
      this.getButton();
      this.getMenu();
    },
    // 模板渲染后钩子函数
    mounted() {

    },
    methods: {
      getButton() {
        let params = {
          url: this.$route.matched[1].path
        }
        queryButton(params).then(res => {
          this.power=res;
        })
      },
      // 获取所有菜单
      getMenu(){
        apiMenuList().then(res =>{
          this.tableData=res;
        });
      },
      // 编辑
      go_edit(row){
        this.$router.push({
          path: '/systemmanagement/menumanagement/edit',
          query: {
            menuId: row.menuId,
          }
        })
      }
    },
  }
</script>

<style scoped>
  .container{
    background: #fff;
    padding: 20px;
  }
</style>
