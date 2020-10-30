<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  #app {
    background-color: #f6f6f6 !important;
    overflow-y: auto;
    font-size: 14px;
  }

  /* 修改弹框的样式 */
  .el-message-box__btns {
    margin-top: 20px;
  }

  .el-message-box--center {
    padding-bottom: 20px;
  }

  .el-message-box__btns button:nth-child(2) {
    margin-left: 30px;
  }
</style>
