import request from '../helpers/request';

function getProvince({ tag, ...params }: any = {}, config?: any) {
  return request
    .withHeaders({ 'Content-Type': 'application/json;utf-8' })
    .build()
    .get(`/api/v1/fs/provinces/list`, params, { ...config });
}


const fsServices = {
  getProvince
}

export default fsServices;