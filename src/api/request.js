import {
  get,
  post,
  postExport
} from '@/api/axios'

let baseURL = '';

if (process.env.NODE_ENV == 'development') { //开发环境
	baseURL = 'http://supplychaintest.zuul.srpqa.top';
} else if (process.env.NODE_ENV == 'production') { //生产环境地址
  baseURL = 'http://supplychain.zuul.chinau.com.cn';
} else if (process.env.NODE_ENV == 'testing') { //测试环境地址
  baseURL = 'http://supplychaintest.zuul.srpqa.top';
}
let imgUrl = baseURL + '/cmsServer/imageFile/upload';

// 上传地址
export {
  imgUrl,
  orderUrl
}
// 登录
export function login(params) {
  return post(baseURL + '/system/user/login', params)
};
