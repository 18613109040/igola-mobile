import request from '../utils/request';

// 新建短链
export async function shortChainCreate(params) {
  return request('/api/shortchain', {
    method: 'POST',
    body: params,
  });
}
// 获取短链列表
export async function shortChainList(params) {
  return request('/api/shortchain', {
    method: 'GET',
    body: params,
  });
}
// 更新短链列表
export async function upDatashortChain(params) {
  return request(`/api/shortchain/${params._id}`, {
    method: 'PUT',
    body: params,
  });
}
// 删除
export async function shortChainDestroy(params) {
  return request(`/api/shortchain/${params.id}`, {
    method: 'DELETE',
    body: params,
  });
}
// 批量删除
export async function shortChainRemoves(params) {
  return request(`/api/shortchain`, {
    method: 'DELETE',
    body: params,
  });
}


//上传图片
export async function uploadFlowImage(params) {
  return request(`/api/upload/flow`, {
    method: 'POST',
    // headers: {
    //   'Content-Type': 'multipart/form-data'
    // },
    body: params,
  });
}

