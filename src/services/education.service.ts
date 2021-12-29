// import qs from 'qs';
import request from '../helpers/request';

function numberOf(params: any = {}) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build({mock: true})
    .get(`/api/v1/education/reports/general`, params);
}


export default {
  numberOf,
};
