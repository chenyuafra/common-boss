import axios from 'axios'
import store from '@/store.js';
import {
  Message,
  Loading
} from 'element-ui'; //element库的消息提示，可以不用
import router from "../router";


let loading;

function startLoading() { //使用Element loading-start 方法
  loading = Loading.service({
    lock: true,
    text: '拼命加载中...',
    background: 'rgba(0,0,0,0.5)',
  })
}

function endLoading() { //使用Element loading-close 方法
  loading.close()
}
// 请求超时时间
axios.defaults.timeout = 20000;

// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/json';
// 请求拦截器
axios.interceptors.request.use(
  config => {
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    const token = store.state.token;
    if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = token;
    }
    startLoading();
    return config;
  },
  error => {
    return Promise.error(error);
  });
// 响应拦截器
axios.interceptors.response.use(
  response => {
    endLoading();
    if (response.status === 200) {
      // console.log(response.data.appraisalResultState.code);
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  // 服务器状态码不是200的情况
  error => {
    if (error.response) {
      // if (error.response.status == 401) {
      //   Message({
      //     showClose: true,
      //     message: '登录失效，请重新登录！',
      //     type: 'error'
      //   });
      //   store.commit('del_token');
      //   router.replace({
      //     path: '/login'
      //   })
      // }
      // console.log(error)
    }
    return Promise.reject(error.response);
  }
);

export function get(url, param) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
        params: param
      })
      .then(res => {
        if (res.data.resultState.code == '10000') {
          resolve(res.data.data);
        } else if (res.data.resultState.code == '-11000') {
          Message({
            showClose: true,
            message: res.data.data,
            type: 'warning'
          });
          return false;
        } else {
          Message({
            showClose: true,
            message: res.data.resultState.codeName,
            type: 'warning'
          });
          return false;
        }
      })
      .catch(err => {
        console.log(err.response.data.appraisalResultState.code)
        if (!err.response) {
          Message({
            showClose: true,
            message: 'get请求错误',
            type: 'error'
          });
        } else {
          reject(err.data);
          console.log(err.response, '异常2');
        }
      })
  });
}

export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(res => {
        if (res.data.resultState.code == '10000') {
          resolve(res.data.data);
        } else if (res.data.resultState.code == '-11000') {
          Message({
            showClose: true,
            message: res.data.data,
            type: 'warning'
          });
          return false;
        } else {
          Message({
            showClose: true,
            message: res.data.resultState.codeName,
            type: 'warning'
          });
          return false;
        }
      })
      .catch(err => {
        console.log(err.response.data.appraisalResultState.code)
        if (!err.response) {
          Message({
            showClose: true,
            message: 'post请求错误',
            type: 'error'
          });
        } else {
          reject(err.data);
          console.log(err.response, '异常2');
        }
      })
  });
}
// 导出请求封装
export function postExport(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params, {
        responseType: 'blob'
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        if (!err.response) {
          Message({
            showClose: true,
            message: 'post请求错误',
            type: 'error'
          });
        } else {
          reject(err.data);
          console.log(err.response, '异常2');
        }
      })
  });
}
export function deletes(url, params) {
  return new Promise((resolve, reject) => {
    axios.delete(url, {
      data: params
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}
export function put(url, params) {
  return new Promise((resolve, reject) => {
    axios.put(url, params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}

export default axios
