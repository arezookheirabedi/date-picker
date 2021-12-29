import { instanceMockAdapter } from "../helpers/requestUtil"


instanceMockAdapter
    .onGet('/api/v1/education/reports/general', {})
    .reply(() => {
        const res: any = {
            numberOfDrivers: 10
        };

        return [200, { ...res }]
    });