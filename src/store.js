import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const store = new Vuex.Store({
  state: {
    // token初始化
    token: '',
    name:'',
    userId:''
  },
  mutations:{
    // 存储token
    set_token(state, token) {
      state.token = token;
      sessionStorage.setItem('token', token);
    },
    set_name(state, name) {
      state.name = name;
      sessionStorage.setItem('name', name);
    },
    set_userId(state, userId) {
      state.userId = userId;
      sessionStorage.setItem('userId', userId);
    },
    // 删除token
    del_token(state) {
      state.token = '';
      sessionStorage.removeItem('token');
    },
    del_name(state) {
      state.name = '';
      sessionStorage.removeItem('name');
    },
    del_userId(state) {
      state.userId = '';
      sessionStorage.removeItem('userId');
    }
  }
})

export default store
