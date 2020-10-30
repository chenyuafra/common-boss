<template>
  <div class="breadcrumb_wrap">
    <el-breadcrumb class="app-breadcrumb" separator=">">
      <span style="float: left;">您所在的当前位置 ： </span>
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.path" v-if="item.meta.title">
          <span v-if="item.redirect==='noredirect' || index==levelList.length-1 || index==0" class="no-redirect">{{item.meta.title}}</span>
          <router-link v-else :to="item.redirect||item.path">{{item.meta.title}}</router-link>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script>
  export default {
    name: 'breadCrumb',
    components: {},
    data () {
      return {
        levelList: null
      }
    },
    created () {
      this.getBreadcrumb()
    },
    watch: {
      $route () {
        this.getBreadcrumb()
      }
    },
    methods: {
      getBreadcrumb () {
        let matched = this.$route.matched.filter(item => item.name)
        const first = matched[0]
        // if (first && first.name !== 'index') {
        //   matched = [{path: '/index', meta: { title: '首页' }}].concat(matched)
        // }
        this.levelList = matched
      }
    }
  }
</script>

<style>

</style>
