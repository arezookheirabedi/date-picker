// import qs from 'qs';
import request from '../helpers/request';

function arboreanGetAll({ tag, ...params }: any = {}, config?: any) {
    return request
        .withHeaders({ 'Content-Type': 'application/json;utf-8' })
        .build({ mock: true })
        .get(`/api/v1/arborean/all`, params, { ...config });
}


const arboreanService = {
    arboreanGetAll
}

export default arboreanService;