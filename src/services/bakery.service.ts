// import qs from 'qs';
import request from '../helpers/request';

function bakeryGeneral({ tag, ...params }: any = {}, config?: any) {
    return request
        .withHeaders({ 'Content-Type': 'application/json;utf-8' })
        .build({ mock: true })
        .get(`/api/v1/bakery/general`, params, { ...config });
}

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

function bakeryPerCategory({ tag, ...params }: any = {}, config?: any) {
    return request
        .withHeaders({ 'Content-Type': 'application/json;utf-8' })
        .build({ mock: true })
        .get(`/api/v1/bakery/per-category`, params, { ...config });
}

function bakeryLicense({ tag, ...params }: any = {}, config?: any) {
    return request
        .withHeaders({ 'Content-Type': 'application/json;utf-8' })
        .build({ mock: true })
        .get(`/api/v1/bakery/license`, params, { ...config });
}

function bakeryActiveTime({ tag, ...params }: any = {}, config?: any) {
    return request
        .withHeaders({ 'Content-Type': 'application/json;utf-8' })
        .build({ mock: true })
        .get(`/api/v1/bakery/active-time`, params, { ...config });
}

function bakerySellRate({ tag, ...params }: any = {}, config?: any) {
    return request
        .withHeaders({ 'Content-Type': 'application/json;utf-8' })
        .build({ mock: true })
        .get(`/api/v1/bakery/sell-rate`, params, { ...config });
}

function bakerySoldCount({ tag, ...params }: any = {}, config?: any) {
    return request
        .withHeaders({ 'Content-Type': 'application/json;utf-8' })
        .build({ mock: true })
        .get(`/api/v1/bakery/sold-count`, params, { ...config });
}

function bakerySupplyFlour({ tag, ...params }: any = {}, config?: any) {
    return request
        .withHeaders({ 'Content-Type': 'application/json;utf-8' })
        .build({ mock: true })
        .get(`/api/v1/bakery/supply-flour`, params, { ...config });
}

function bakeryAudit({ tag, ...params }: any = {}, config?: any) {
    return request
        .withHeaders({ 'Content-Type': 'application/json;utf-8' })
        .build({ mock: true })
        .get(`/api/v1/bakery/audit`, params, { ...config });
}


const bakeryService = {
    bakeryGeneral,
    bakeryReport,
    bakeryCount,
    bakeryPerCategory,
    bakeryLicense,
    bakeryActiveTime,
    bakerySellRate,
    bakerySoldCount,
    bakerySupplyFlour,
    bakeryAudit
}

export default bakeryService;