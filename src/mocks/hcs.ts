import { instanceMockAdapter } from '../helpers/requestUtil';

instanceMockAdapter
  // eslint-disable-next-line
  .onGet(/\/api\/v1\/hcs\-reporter\/organizations\/(.*)\/members\/general\/(.*)/g, {})
  .reply(() => {
    const res: any = {
      numberOfPositive: 3314,
      numberOfRecovered: 0,
      numberOfVaccinated: 2444302,
      numberOfNanVaccinated: 137517,
      numberOfTestResults: 19342,
      total: 2581819,
    };

    return [200, { ...res }];
  });

instanceMockAdapter
  // eslint-disable-next-line
  .onGet(/\/api\/v1\/hcs\-reporter\/organizations\/(.*)\/members\/tag\-based/g, {})
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
  .onGet(/\/api\/v1\/hcs\-reporter\/organizations\/(.*)\/test\-results\/time\-based/g, {})
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
  .onGet(/\/api\/v1\/hcs\-reporter\/organizations\/(.*)\/test\-results\/tag\-based/g, {})
  .reply(() => {
    /*
    [
      '{{repeat(15, 15)}}',
      {
        _id: '{{objectId()}}',
        tag: 'a{{index()}}',
        positiveCount: '{{integer(20, 40)}}',
        negativeCount: '{{integer(30, 40)}}',
        total: '{{integer(80, 110)}}'
      }
    ]
    */

    const res: any = [
      {
        _id: '61d40d2b964cae329b07652b',
        tag: 'a1',
        positiveCount: 20,
        negativeCount: 34,
        total: 86,
      },
      {
        _id: '61d40d2b781e3ce2d418bb92',
        tag: 'a2',
        positiveCount: 25,
        negativeCount: 39,
        total: 105,
      },
      {
        _id: '61d40d2bad4f2224340b34c7',
        tag: 'a3',
        positiveCount: 35,
        negativeCount: 30,
        total: 83,
      },
      {
        _id: '61d40d2b588fd66e3455e82c',
        tag: 'a4',
        positiveCount: 39,
        negativeCount: 35,
        total: 95,
      },
      {
        _id: '61d40d2bc636cf67692a0c38',
        tag: 'a5',
        positiveCount: 20,
        negativeCount: 31,
        total: 105,
      },
      {
        _id: '61d40d2b78261f71ec6a4a41',
        tag: 'a6',
        positiveCount: 25,
        negativeCount: 35,
        total: 108,
      },
      {
        _id: '61d40d2ba4cf23a0de5c9456',
        tag: 'a7',
        positiveCount: 28,
        negativeCount: 31,
        total: 89,
      },
      {
        _id: '61d40d2b334834857d6cabe6',
        tag: 'a8',
        positiveCount: 38,
        negativeCount: 40,
        total: 108,
      },
      {
        _id: '61d40d2b53a9573e73412301',
        tag: 'a9',
        positiveCount: 39,
        negativeCount: 35,
        total: 89,
      },
      {
        _id: '61d40d2b5096449573435530',
        tag: 'a10',
        positiveCount: 35,
        negativeCount: 39,
        total: 107,
      },
      {
        _id: '61d40d2b22b9d8c1a2e59dc4',
        tag: 'a11',
        positiveCount: 25,
        negativeCount: 32,
        total: 97,
      },
      {
        _id: '61d40d2b55cd8da6c90f547c',
        tag: 'a12',
        positiveCount: 29,
        negativeCount: 38,
        total: 106,
      },
      {
        _id: '61d40d2bfca7370102b6ba82',
        tag: 'a13',
        positiveCount: 39,
        negativeCount: 34,
        total: 85,
      },
      {
        _id: '61d40d2bf35de7cf347d20bc',
        tag: 'a14',
        positiveCount: 27,
        negativeCount: 39,
        total: 80,
      },
    ];

    return [200, res];
  });

instanceMockAdapter
  // eslint-disable-next-line
  .onGet(/\/api\/v1\/hcs\-reporter\/organizations\/(.*)\/vaccines\/\/doses\/tag\-based/g, {})
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
            null: 50,
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
      {
        tag: "a4"
      }
    ];

    return [200, res];
  });

instanceMockAdapter
  // eslint-disable-next-line
  .onGet(/\/api\/v1\/hcs\-reporter\/organizations\/(.*)\/vaccines\/doses/g, {})
  .reply(() => {
    const res: any = [
      {
        '1': 468588,
      },
      {
        '0': 251618,
      },
      {
        '2': 1816182,
      },
      {
        '3': 45205,
      },
      {
        '5': 226,
      },
      {
        null: 10,
      }
    ];

    return [200, res];
  });
