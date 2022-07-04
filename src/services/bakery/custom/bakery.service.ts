// import qs from 'qs';
import request from '../../../helpers/request';

function bakeryCount({ tag, ...params }: any = {}, config?: any) {
    return request
        .withHeaders({ 'Content-Type': 'application/json;utf-8' })
        .build()
        .get(`/api/v1/guilds/inspections/bakeries/count`, params, { ...config });
}

function bakeryReport({ reportName, ...params }: any = {}, config?: any) {
    return request
        .withHeaders({ 'Content-Type': 'application/json;utf-8' })
        .build()
        .get(`/api/v1/hcs-reporter/bakery/report-name/${reportName}`, params, { ...config });
}


const bakeryService = {
    bakeryReport,
    bakeryCount,
}

export default bakeryService;