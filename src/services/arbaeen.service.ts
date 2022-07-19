// import qs from 'qs';
import request from '../helpers/request';

function arbaeenGetAll({ tag, ...params }: any = {}, config?: any) {
    return request
        .withHeaders({ 'Content-Type': 'application/json;utf-8' })
        .build({ mock: true })
        .get(`/api/v1/arbaeen/all`, params, { ...config });
}


const arbaeenService = {
    arbaeenGetAll
}

export default arbaeenService;