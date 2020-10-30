<template>
  <el-container class="home-container">
    <!--头部-->
    <el-header style="height:80px;">
      <el-row type="flex" align="middle" style="width: 100%;">
        <el-col :span="4" class="topbar-wrap">
          <div class="topbar-logos">后台模板</div>
        </el-col>
        <el-col style="font-size: 16px;min-width: 980px;">
          <el-menu :default-active="path" class="el-menu-demo" router mode="horizontal" @select="handleSelect"
            background-color="#001428" text-color="#fff" active-text-color="#409EFF">
            <el-submenu :index="item.url" v-for="(item, i) in menu" :key="i">
              <template slot="title">{{item.menuName}}</template>
              <el-menu-item :index="item2.url" v-for="(item2, j) in item.children" :key="j" v-if="!(item2.children&&item2.children.length)">{{item2.menuName}}</el-menu-item>
              <el-submenu :index="item2.url" v-for="(item2, j) in item.children" :key="j" v-if="item2.children&&item2.children.length">
                <template slot="title">{{item2.menuName}}</template>
                <el-menu-item :index="item3.url" v-for="(item3,k) in item2.children" :key="k">{{item3.menuName}}</el-menu-item>
              </el-submenu>
            </el-submenu>
          </el-menu>
        </el-col>
        <el-col :span="3">
          <span style="font-size: 15px;color: #fff;">{{this.$store.state.name}}</span>
          <el-divider direction="vertical"></el-divider>
          <span @click="logout" style="font-size: 15px;color: #fff;cursor: pointer;">注销</span>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <bread-crumb v-if="$route.path != '/index'" style="margin:0 0 20px;"></bread-crumb>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>
<script>
  import breadCrumb from '../components/breadcrumb';
  import {
    userMenu,
    logout
  } from '@/api/request.js';
  export default {
    name: 'home',
    data() {
      return {
        defaultActiveIndex: "/",
        loading: false,
        nickname: '',
        menu: [],
        path: ''
      }
    },
    created() { // 组件创建完后获取数据，
      let actUrl = this.$route.path.split('/');
      if (actUrl.length == 4) {
        let act = actUrl.slice(0, 3).join('/');
        this.path = act;
      } else if (actUrl.length == 5) {
        let act = actUrl.slice(0, 4).join('/');
        this.path = act;
      }
      this.getMenu();
      // this.getUserMenu();
    },
    components: {
      breadCrumb
    },
    methods: {
      getUserMenu() {
        userMenu().then(res => {
          this.menu = res;
        })
      },

      getMenu() {
        this.menu = [{
          "menuId": 99,
          "menuName": "基础管理",
          "garden": 0,
          "parent": null,
          "url": "/basicmanagement",
          "children": [{
              "menuId": 106,
              "menuName": "计量单位",
              "garden": 1,
              "parent": 99,
              "url": "/basicmanagement/themeasuringunit"
            },
            {
              "menuId": 106,
              "menuName": "仓库管理",
              "garden": 1,
              "parent": 99,
              "url": "/basicmanagement/basicwarehousemanagement"
            },
            {
              "menuId": 106,
              "menuName": "监控预警",
              "garden": 1,
              "parent": 99,
              "url": "/basicmanagement/monitoringearlywarning",
              "children": [{
                "menuId": 106,
                "menuName": "安全库存预警",
                "garden": 1,
                "parent": 99,
                "url": "/basicmanagement/monitoringearlywarning/safetystock",
              }, {
                "menuId": 106,
                "menuName": "有效期预警",
                "garden": 1,
                "parent": 99,
                "url": "/basicmanagement/monitoringearlywarning/validity",
              }]
            },
            {
              "menuId": 106,
              "menuName": "规则设置",
              "garden": 1,
              "parent": 99,
              "url": "/basicmanagement/rulesettings",
              "children": [{
                "menuId": 106,
                "menuName": "物流渠道设置",
                "garden": 1,
                "parent": 99,
                "url": "/basicmanagement/rulesettings/logisticsrules"
              }, {
                "menuId": 106,
                "menuName": "仓库物流配送设置",
                "garden": 1,
                "parent": 99,
                "url": "/basicmanagement/rulesettings/warehouserules"
              }, {
                "menuId": 106,
                "menuName": "拣货策略设置",
                "garden": 1,
                "parent": 99,
                "url": "/basicmanagement/rulesettings/pickingrules"
              }, {
                "menuId": 106,
                "menuName": "安全库存设置",
                "garden": 1,
                "parent": 99,
                "url": "/basicmanagement/rulesettings/safetyrules"
              }]
            }
          ]
        }, {
          "menuId": 99,
          "menuName": "系统管理",
          "garden": 0,
          "parent": null,
          "url": "/systemmanagement",
          "children": [
            {
              "menuId": 106,
              "menuName": "菜单管理",
              "garden": 1,
              "parent": 99,
              "url": "/systemmanagement/menumanagement"
            },
            {
              "menuId": 106,
              "menuName": "账号设置",
              "garden": 1,
              "parent": 99,
              "url": "/systemmanagement/accountsettings"
            }
          ]
        }]
      },
      handleSelect(index, indexPath) {
        // console.log(index);
      },
      // 回首页
      goIndex() {
        this.$router.push('/index');
      },
      // 退出
      logout() {
        let params = {
          userId: this.$store.state.userId
        }
        logout(params).then(res => {
          console.log(res)
          this.$store.commit('del_token');
          this.$store.commit('del_name');
          this.$store.commit('del_userId');
          this.$router.push('/login');
        })
      }
    },
    mounted() {

    },
  }
</script>
<style>
  .home-container {
    height: 100%;
  }

  .topbar-wrap {
    width: 200px;
    margin: 0 20px 0 20px;
  }

  .el-header {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    user-select: none;
    background-color: #001428;
  }

  .mlr10 {
    margin: 0 10px;
    font-style: normal;
  }

  .topbar-title {
    display: inline-block;
    vertical-align: middle;
    margin-left: 55px;
  }

  .topbar-logos {
    display: inline-block;
    vertical-align: middle;
    font-size: 20px;
    color: #fff;
  }

  .el-menu.el-menu--horizontal {
    border-bottom: none !important;
  }

  .el-menu--horizontal>.el-menu-item {
    height: 80px !important;
    line-height: 80px !important;
  }

  .el-menu--horizontal>.el-submenu .el-submenu__title {
    height: 80px !important;
    line-height: 80px !important;
  }

  .el-submenu__title {
    font-size: 15px;
  }
</style>
