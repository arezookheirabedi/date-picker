// import qs from 'qs';
import request from '../helpers/request';

function sendMessage({ ...params }: any = {}, config?: any) {
    return request
        .withHeaders({ 'Content-Type': 'application/json;utf-8' })
        .build()
        .post(`/public/v1/contact-us`, params, { ...config });
}

const publicService = {
    sendMessage,
};

export default publicService;
