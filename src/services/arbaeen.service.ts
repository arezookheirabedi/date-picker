// import qs from 'qs';
import request from '../helpers/request';

function arbaeenGetAll({tag, ...params}: any = {}, config?: any) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build({mock: true})
    .get(`/api/v1/arbaeen/all`, params, {...config});
}
function getPiligrimList(params: any = {}, config?: any) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get(`/api/v1/arbaeen/reports`, params, {...config});
}
function abroadList() {
  const mock = {
    data: [
      {key: 'شلمچه', value: 'شلمچه'},
      {key: 'چزابه', value: 'چزابه'},
      {key: 'مهران', value: 'مهران'},
      {key: 'خسروی', value: 'خسروی'},
      {key: 'هوایی', value: 'هوایی'},
    ],
  };
  return Promise.resolve(mock);
}

const arbaeenService = {
  arbaeenGetAll,
  getPiligrimList,
  abroadList,
};

export default arbaeenService;
