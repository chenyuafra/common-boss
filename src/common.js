import { imageToken } from '@/api/request.js';
// 获取上传图片秘钥
export function getImageToken(){
  let params={
    systemType:'SUPPLYCHAIN'
  }
  imageToken(params).then(res =>{
    sessionStorage.removeItem('imageToken');
    sessionStorage.setItem('imageToken', JSON.stringify(res));
  })
}
