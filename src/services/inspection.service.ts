import request from '../helpers/request';

function inspectionStatus({ tag, ...params }: any = {}, config?: any) {
    return request
        .withHeaders({ 'Content-Type': 'application/json;utf-8' })
        .build({ mock: true })
        .get(`/api/v1/inspection/status`, params, { ...config });
}

const inspectionService = {
    inspectionStatus
}

export default inspectionService;