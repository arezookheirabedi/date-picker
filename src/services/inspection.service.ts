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

function ratioOfInspection({ tag, ...params }: any = {}, config?: any) {
    return request
        .withHeaders({ 'Content-Type': 'application/json;utf-8' })
        .build({ mock: true })
        .get(`/api/v1/inspection/ratio`, params, { ...config });
}

function inspectionDone({ tag, ...params }: any = {}, config?: any) {
    return request
        .withHeaders({ 'Content-Type': 'application/json;utf-8' })
        .build({ mock: true })
        .get(`/api/v1/inspection/done`, params, { ...config });
}

function inspectionReport({ tag, ...params }: any = {}, config?: any) {
    return request
        .withHeaders({ 'Content-Type': 'application/json;utf-8' })
        .build({ mock: true })
        .get(`/api/v1/inspection/report`, params, { ...config });
}

function inspectionStatusOfCookingVariety({ tag, ...params }: any = {}, config?: any) {
    return request
        .withHeaders({ 'Content-Type': 'application/json;utf-8' })
        .build({ mock: true })
        .get(`/api/v1/inspection/cooking-variety`, params, { ...config });
}

function reports({ tag, ...params }: any = {}, config?: any) {
    return request
      .withHeaders({ 'Content-Type': 'application/json;utf-8' })
      .build()
      .get(`/api/v1/inspection/reports`, params, { ...config });
}

function reportsGroupByDate({...params }: any = {}, config?: any){
    return request
      .withHeaders({ 'Content-Type': 'application/json;utf-8' })
      .build()
      .get(`/api/v1/inspection/reports/group-by-date/count`, params, { ...config });
}

const inspectionService = {
    inspectionStatus,
    inspectionAll,
    inspectionAverageFlour,
    ratioOfInspection,
    inspectionDone,
    inspectionReport,
    inspectionStatusOfCookingVariety,
    reports,
    reportsGroupByDate
}

export default inspectionService;