import {instanceMockAdapter} from '../helpers/requestUtil';

instanceMockAdapter
  // eslint-disable-next-line
  .onGet(/\/api\/v1\/hcs\-reporter\/organizations\/(.*)\/member\/general\/(.*)/g, {})
  .reply(() => {
    const res: any = {
      numberOfPositive: 10,
      numberOfRecovered: 20,
      numberOfVaccinated: 30,
      numberOfNanVaccinated: 40,
      numberOfTestResults: 50,
      total: 60,
    };

    return [200, {...res}];
  });

instanceMockAdapter
  // eslint-disable-next-line
  .onGet(/\/api\/v1\/hcs\-reporter\/organizations\/(.*)\/member\/tag\-based/g, {})
  .reply(() => {
    const res: any = [
      {
        tag: 'a1',
        total: 10,
        positiveCount: 4,
        recoverdCount: 6,
      },
      {
        tag: 'a2',
        total: 20,
        positiveCount: 10,
        recoverdCount: 10,
      },
      {
        tag: 'a3',
        total: 30,
        positiveCount: 25,
        recoverdCount: 5,
      },
    ];

    return [200, res];
  });

instanceMockAdapter
  // eslint-disable-next-line
  .onGet(/\/api\/v1\/hcs\-reporter\/organizations\/(.*)\/test\-result\/time\-based/g, {})
  .reply(() => {
    const res: any = [
      {
        date: '10',
        count: 10,
      },
      {
        date: '11',
        count: 10,
      },
    ];

    return [200, res];
  });

instanceMockAdapter
  // eslint-disable-next-line
  .onGet(/\/api\/v1\/hcs\-reporter\/organizations\/*\/test\-result\/tag\-based/g, {})
  .reply(() => {
    const res: any = [
      {
        tag: 'a1',
        positiveCount: 0,
        negativeCount: 0,
        total: 0,
      },
      {
        tag: 'a2',
        positiveCount: 0,
        negativeCount: 0,
        total: 0,
      },
    ];

    return [200, res];
  });

instanceMockAdapter
  // eslint-disable-next-line
  .onGet(/\/api\/v1\/hcs\-reporter\/organizations\/(.*)\/doses/g, {})
  .reply(() => {
    const res: any = [
      {
        '1': 10,
      },
      {
        '0': 10,
      },
      {
        '2': 10,
      },
      {
        '3': 10,
      },
      {
        '5': 10,
      },
      {
        null: 10,
      },
    ];

    return [200, res];
  });

instanceMockAdapter
  // eslint-disable-next-line
  .onGet(/\/api\/v1\/hcs\-reporter\/organizations\/(.*)\/doses\/tag\-based/g, {})
  .reply(() => {
    const res: any = [
      {
        tag: 'a1',
        dosesCountMap: [
          {
            '1': 10,
          },
          {
            '0': 10,
          },
          {
            '2': 10,
          },
          {
            '3': 10,
          },
          {
            '5': 10,
          },
          {
            null: 10,
          },
        ],
      },
      {
        tag: 'a2',
        dosesCountMap: [
          {
            '1': 10,
          },
          {
            '0': 10,
          },
          {
            '2': 10,
          },
          {
            '3': 10,
          },
          {
            '5': 10,
          },
          {
            null: 10,
          },
        ],
      },
      {
        tag: 'a3',
        dosesCountMap: [
          {
            '1': 10,
          },
          {
            '0': 10,
          },
          {
            '2': 10,
          },
          {
            '3': 10,
          },
          {
            '5': 10,
          },
          {
            null: 10,
          },
        ],
      },
    ];

    return [200, res];
  });
