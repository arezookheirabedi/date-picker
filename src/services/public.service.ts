// import qs from 'qs';
import request from '../helpers/request';

function sendMessage({ ...params }: any = {}, config?: any) {
    return request
        .withHeaders({ 'Content-Type': 'application/json;utf-8' })
        .build()
        .post(`/public/v1/contact-us`, params, { ...config });
}

function getTime({ ...params }: any = {}, config?: any) {
    return request
      .withHeaders({ 'Content-Type': 'application/json;utf-8' })
      .build()
      .get(`/public/v1/hcs-reporter/date-time/now`, params, { ...config });
}


const publicService = {
    sendMessage,
    getTime
};

export default publicService;
