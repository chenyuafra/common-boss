import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store.js'

import Home from '@/components/home.vue'
import Middle from '@/components/middle.vue'
import Index from '@/views/index.vue'
import Login from '@/views/login.vue'
// 模块一
// 系统管理
import CompanyManagement from '@/views/systemmanagement/companymanagement/index.vue'
import CompanyManagementAdd from '@/views/systemmanagement/companymanagement/add.vue'
import CompanyManagementEdit from '@/views/systemmanagement/companymanagement/edit.vue'
import StaffManagement from '@/views/systemmanagement/staffmanagement/index.vue'
import StaffManagementAdd from '@/views/systemmanagement/staffmanagement/add.vue'
import StaffManagementEdit from '@/views/systemmanagement/staffmanagement/edit.vue'
import RoleManagement from '@/views/systemmanagement/rolemanagement/index.vue'
import RoleManagementAdd from '@/views/systemmanagement/rolemanagement/add.vue'
import RoleManagementEdit from '@/views/systemmanagement/rolemanagement/edit.vue'
import MenuManagement from '@/views/systemmanagement/menumanagement/index.vue'
import MenuManagementEdit from '@/views/systemmanagement/menumanagement/edit.vue'
import AccountSettings from '@/views/systemmanagement/accountsettings/index.vue'



// 懒加载方式，当路由被访问的时候才加载对应组件
//const Login = resolve => require(['@/views/home'], resolve)

Vue.use(Router)
// 刷新防止vuex丢失
if (sessionStorage.getItem('token')) {
  store.commit('set_token', sessionStorage.getItem('token'));
  store.commit('set_name', sessionStorage.getItem('name'));
  store.commit('set_userId', sessionStorage.getItem('userId'));
}
// 解决重复报错
const VueRouterPush = Router.prototype.push
Router.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}
let router = new Router({
  routes: [{
      path: '/',
      redirect: '/login' // 如果用户访问的 / 根路径，则 重定向到 /login 页面
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      redirect: '/index',
      children: [{
        path: '/Middle',
        component: Middle,
        name: 'middle',
        children: [{
          path: '/index',
          component: Index,
          name: 'index',
        }]
      }]
    },
    {
      path: '/systemmanagement',
      name: 'systemmanagement',
      meta: {
        title: '系统管理',
      },
      component: Home,
      children: [{
        path: '/systemmanagement/companymanagement',
        component: Middle,
        name: 'companymanagement',
        redirect: '/systemmanagement/companymanagement/index',
        meta: {
          title: '公司管理',
        },
        children: [
          {
            path: '/systemmanagement/companymanagement/index',
            component: CompanyManagement,
            name: 'companymanagementindex',
            meta: {
              title: '',
            }
          },{
            path: '/systemmanagement/companymanagement/add',
            component: CompanyManagementAdd,
            name: 'companymanagementadd',
            meta: {
              title: '新增',
            }
          },{
            path: '/systemmanagement/companymanagement/edit',
            component: CompanyManagementEdit,
            name: 'companymanagementedit',
            meta: {
              title: '编辑',
            }
          }
        ]
      }, {
        path: '/systemmanagement/staffmanagement',
        component: Middle,
        name: 'staffmanagement',
        redirect: '/systemmanagement/staffmanagement/index',
        meta: {
          title: '员工管理',
        },
        children: [
          {
            path: '/systemmanagement/staffmanagement/index',
            component: StaffManagement,
            name: 'staffmanagementindex',
            meta: {
              title: '',
            }
          },{
            path: '/systemmanagement/staffmanagement/add',
            component: StaffManagementAdd,
            name: 'staffmanagementadd',
            meta: {
              title: '新增',
            }
          },{
            path: '/systemmanagement/staffmanagement/edit',
            component: StaffManagementEdit,
            name: 'staffmanagementedit',
            meta: {
              title: '编辑',
            }
          }
        ]
      }, {
        path: '/systemmanagement/rolemanagement',
        component: Middle,
        name: 'rolemanagement',
        redirect: '/systemmanagement/rolemanagement/index',
        meta: {
          title: '角色管理',
        },
        children: [
          {
            path: '/systemmanagement/rolemanagement/index',
            component: RoleManagement,
            name: 'rolemanagementindex',
            meta: {
              title: '',
            }
          },{
            path: '/systemmanagement/rolemanagement/add',
            component: RoleManagementAdd,
            name: 'rolemanagementadd',
            meta: {
              title: '新增',
            }
          },{
            path: '/systemmanagement/rolemanagement/edit',
            component: RoleManagementEdit,
            name: 'rolemanagementedit',
            meta: {
              title: '编辑',
            }
          }
        ]
      }, {
        path: '/systemmanagement/menumanagement',
        component: Middle,
        name: 'menumanagement',
        redirect: '/systemmanagement/menumanagement/index',
        meta: {
          title: '菜单管理',
        },
        children: [
          {
            path: '/systemmanagement/menumanagement/index',
            component: MenuManagement,
            name: 'menumanagementindex',
            meta: {
              title: '',
            }
          },{
            path: '/systemmanagement/menumanagement/edit',
            component: MenuManagementEdit,
            name: 'menumanagementedit',
            meta: {
              title: '编辑',
            }
          }
        ]
      }, {
        path: '/systemmanagement/accountsettings',
        component: AccountSettings,
        name: 'accountsettings',
        meta: {
          title: '账号设置',
        }
      }]
    }
  ]
});
// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  } else {
    let token = store.state.token;
    if (token === 'null' || token === '') {
      next('/login');
    } else {
      next();
    }
  }
});
export default router
