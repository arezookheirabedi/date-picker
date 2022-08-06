import request from '../helpers/request';

function inspectionStatus({ tag, ...params }: any = {}, config?: any) {
    return request
        .withHeaders({ 'Content-Type': 'application/json;utf-8' })
        .build({ mock: true })
        .get(`/api/v1/inspection/status`, params, { ...config });
}

function inspectionAll({ tag, ...params }: any = {}, config?: any) {
    return request
        .withHeaders({ 'Content-Type': 'application/json;utf-8' })
        .build({ mock: true })
        .get(`/api/v1/inspection/all`, params, { ...config });
}

function inspectionAverageFlour({ tag, ...params }: any = {}, config?: any) {
    return request
        .withHeaders({ 'Content-Type': 'application/json;utf-8' })
        .build({ mock: true })
        .get(`/api/v1/inspection/average-flour`, params, { ...config });
}

function RatioOfInspection({ tag, ...params }: any = {}, config?: any) {
    return request
        .withHeaders({ 'Content-Type': 'application/json;utf-8' })
        .build({ mock: true })
        .get(`/api/v1/inspection/ratio`, params, { ...config });
}

const inspectionService = {
    inspectionStatus,
    inspectionAll,
    inspectionAverageFlour,
    RatioOfInspection
}

export default inspectionService;