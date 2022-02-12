
// import qs from 'qs';
import request from '../helpers/request';

function membersGeneral({ ...params }: any = {}, config?: any) {
    return request
        .withHeaders({ 'Content-Type': 'application/json;utf-8' })
        .build()
        .get(`/api/v1/hcs-reporter/vaccines/general`, params, { ...config });
}

function dosesTagBased({ ...params }: any = {}, config?: any) {
    return request
        .withHeaders({ 'Content-Type': 'application/json;utf-8' })
        .build()
        .get(`/api/v1/hcs-reporter/vaccines/provinces`, params, { ...config });
}




const vaccineService = {
    membersGeneral,
    dosesTagBased,
};

export default vaccineService;
