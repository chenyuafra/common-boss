<template>
  <div class="container">
    <div class="p20 bgfff">
      <el-button size="medium" type="primary" @click="query">查询</el-button>
      <el-button size="medium" type="primary" @click="add" v-if="power.hasOwnProperty('新增')">新增</el-button>
    </div>
    <div class="p20 bgfff" style="margin-top: 20px;">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="角色名称:">
          <el-input v-model="form.roleName" class="w200"></el-input>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed type="selection" width="55">
        </el-table-column>
        <el-table-column prop="roleName" label="角色名称">
        </el-table-column>
        <el-table-column prop="description" label="描述">
        </el-table-column>
        <el-table-column prop="gmtCreate" label="创建时间">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button @click="go_edit(scope.row)" type="text" v-if="power.hasOwnProperty('编辑')">修改</el-button>
            <el-button @click="go_del(scope.row)" type="text" v-if="power.hasOwnProperty('删除')">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagebox">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagedata.currentPage*1"
          :page-sizes="[10, 20, 50, 100]" :page-size="pagedata.pageSize*1" layout="prev, pager, next,sizes, jumper"
          :total="pagedata.total*1">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    roleListPage,
    roleDelete,
    queryButton
  } from '@/api/request.js';
  export default {
    name: '',
    data() {
      return {
        currentPage: 1,
        pageSize: 20,
        form: {
          roleName: ''
        },
        tableData: [],
        pagedata: {},
        power: {}
      }
    },
    // 模板渲染前钩子函数
    created() {
      this.getButton();
      this.getList();
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
          this.power = res;
        })
      },
      getList() {
        let params = {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          roleName: this.form.roleName
        }
        roleListPage(params).then(res => {
          this.pagedata = res;
          this.tableData = res.rows;
        })
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getList();
      },
      query() {
        this.currentPage = 1;
        this.getList();
      },
      add() {
        this.$router.push({
          path: '/systemmanagement/rolemanagement/add'
        })
      },
      go_edit(row) {
        this.$router.push({
          path: '/systemmanagement/rolemanagement/edit',
          query: {
            roleId: row.roleId
          }
        })
      },
      go_del(row) {
        this.$confirm('您确定要删除吗？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              let params = {
                roleId: row.roleId
              }
              roleDelete(params).then(res => {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                instance.confirmButtonLoading = false;
                instance.confirmButtonText = '确定';
                done();
                this.getList();
              })
            } else {
              instance.confirmButtonLoading = false;
              instance.confirmButtonText = '确定';
              done();
            }
          }
        }).then(() => {

        }).catch(() => {

        })
      }
    },
  }
</script>
<style scoped>

</style>
