import {AxiosResponse} from 'axios';
import request from 'src/helpers/request';

function passengerTestResult({...params}: any = {}, config?: any): Promise<AxiosResponse<any>> {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get(`/api/v1/hcs-reporter/trips/test-results/general`, params, {...config});
}

function dosesTagBased(
  params: any = {}, config?: any
) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get(`/api/v1/hcs-reporter/trips/vaccines/provinces`, params, {...config});
}

function passengerOverViewByCategory(
  {tag, category, ...params}: any = {},
  config?: any
) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get(`/api/v1/hcs-reporter/test-results/overview/tags/${tag}/categories/${category}`, params, {
      ...config,
    });
}
function passengerTestResultByCategory(
  {tag, category, ...params}: any = {},
  config?: any
) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get(`/api/v1/hcs-reporter/test-results/tags/${tag}/categories/${category}`, params, {
      ...config,
    });
}

export default {
  passengerTestResult,
  dosesTagBased,
  passengerOverViewByCategory,
  passengerTestResultByCategory,
};
