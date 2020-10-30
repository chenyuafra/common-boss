<template>
  <div class="container">
    <div class="p20 bgfff">
      <el-button size="medium" type="primary" @click="query">查询</el-button>
      <el-button size="medium" type="primary" @click="add" v-if="power.hasOwnProperty('新增')">新增</el-button>
      <el-button size="medium" type="primary" @click="startUsing" v-if="power.hasOwnProperty('启用')">启用</el-button>
      <el-button size="medium" type="primary" @click="stopUsing" v-if="power.hasOwnProperty('停用')">停用</el-button>
    </div>
    <div class="p20 bgfff" style="margin-top: 20px;">
      <el-form ref="form" :model="form" label-width="120px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="登录名:">
              <el-input v-model="form.username" class="w200"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="员工姓名:">
              <el-input v-model="form.staffName" class="w200"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系电话:">
              <el-input v-model="form.mobile" class="w200"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="账号状态:">
              <el-select v-model="form.accountStatus" placeholder="请选择" class="w200">
                <el-option label="全部" value="00"></el-option>
                <el-option label="启用" value="ENABLE"></el-option>
                <el-option label="停用" value="DISABLE"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-table :data="tableData" @selection-change="handleSelectionChange" border style="width: 100%">
        <el-table-column fixed type="selection" width="55">
        </el-table-column>
        <el-table-column prop="username" label="登录名">
        </el-table-column>
        <el-table-column prop="staffName" label="员工姓名">
        </el-table-column>
        <el-table-column prop="mobile" label="联系电话">
        </el-table-column>
        <el-table-column prop="role" label="所属角色">
        </el-table-column>
        <el-table-column prop="department" label="所属部门">
        </el-table-column>
        <el-table-column prop="operator" label="操作员姓名">
        </el-table-column>
        <el-table-column label="账号状态">
          <template slot-scope="scope">
            <span v-if="scope.row.accountStatus">{{JSON.parse(scope.row.accountStatus).desc}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="gmtCreate" label="创建时间">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="90" align="center">
          <template slot-scope="scope">
            <el-button @click="go_edit(scope.row)" type="text" v-if="power.hasOwnProperty('编辑') && scope.row.accountStatus && JSON.parse(scope.row.accountStatus).name!='ENABLE'">修改</el-button>
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
    staffListPage,
    staffEnable,
    staffDisable,
    queryButton
  } from '@/api/request.js';
  export default {
    name: '',
    data() {
      return {
        currentPage: 1,
        pageSize: 20,
        selectData: [],
        form: {
          username: '',
          staffName: '',
          mobile: '',
          accountStatus: '00'
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
          username: this.form.username,
          staffName: this.form.staffName,
          mobile: this.form.mobile,
          accountStatus: this.form.accountStatus != '00' ? this.form.accountStatus : null
        }
        staffListPage(params).then(res => {
          this.pagedata = res;
          this.tableData = res.rows;
        })
      },
      // 表格选中
      handleSelectionChange(val) {
        this.selectData = val;
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
          path: '/systemmanagement/staffmanagement/add'
        })
      },
      // 批量启用
      startUsing() {
        if (!this.selectData.length) {
          this.$message.warning('请选择列表数据！');
          return false;
        }
        let tempArr = [];
        for (let i = 0; i < this.selectData.length; i++) {
          if (JSON.parse(this.selectData[i].accountStatus).name != 'DISABLE') {
            this.$message.warning('请选择停用状态的账号！');
            return false
          } else {
            tempArr.push(this.selectData[i].staffId)
          }
        }
        this.$confirm('您确定要启用吗？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              let params = {
                staffIds: tempArr
              }
              staffEnable(params).then(res => {
                this.$message({
                  type: 'success',
                  message: '启用成功!'
                });
                this.selectData = [];
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
      },
      stopUsing() {
        if (!this.selectData.length) {
          this.$message.warning('请选择列表数据！');
          return false;
        }
        let tempArr = [];
        for (let i = 0; i < this.selectData.length; i++) {
          if (JSON.parse(this.selectData[i].accountStatus).name != 'ENABLE') {
            this.$message.warning('请选择启用状态账号！');
            return false
          } else {
            tempArr.push(this.selectData[i].staffId)
          }
        }
        this.$confirm('您确定要停用吗？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              let params = {
                staffIds: tempArr
              }
              staffDisable(params).then(res => {
                this.$message({
                  type: 'success',
                  message: '停用成功!'
                });
                this.selectData = [];
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
      },
      go_edit(row) {
        this.$router.push({
          path: '/systemmanagement/staffmanagement/edit',
          query: {
            staffId: row.staffId
          }
        })
      },
    },
  }
</script>
<style scoped>
</style>
