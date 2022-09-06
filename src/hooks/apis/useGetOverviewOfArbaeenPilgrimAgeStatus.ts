import {useEffect, useState} from 'react';
import axios from 'axios';
import arbaeenService from 'src/services/arbaeen.service';
import {sideCities} from 'src/helpers/utils';
import {useHistory, useLocation} from 'react-router-dom';
import {ECOLOR} from 'src/constants/color.enum';
import {EERRORS} from '../../constants/errors.enum';

const initialDataCount = {
  categories: [
    '۷۵ سال به بالا ',
    'سال (۱۵-۰)',
    ' سال (۷۵-۶۱)',
    'سال (۳۰-۱۶)',
    'سال (۶۰-۴۶)',
    'سال (۴۵-۳۱)',
  ],
  series: [
    {
      name: 'تعداد',

      data: [
        {name: '۷۵ سال به بالا', y: 3157, color: ECOLOR.COLOR6},
        {name: 'سال (۴۵-۳۱)', y: 177805, color: ECOLOR.COLOR3},
        {name: 'سال (۶۰-۴۶)', y: 166493, color: ECOLOR.COLOR4},
        {name: 'سال (۳۰-۱۶)', y: 96538, color: ECOLOR.COLOR2},
        {name: 'سال (۷۵-۶۱)', y: 63747, color: ECOLOR.COLOR5},
        {name: 'سال (۱۵-۰)', y: 55178, color: ECOLOR.COLOR1},
      ],
    },
  ],
} as any;

const initialDataPercentage = {
  categories: [
    '۷۵ سال به بالا ',
    'سال (۱۵-۰)',
    ' سال (۷۵-۶۱)',
    'سال (۳۰-۱۶)',
    'سال (۶۰-۴۶)',
    'سال (۴۵-۳۱)',
  ],
  series: [
    {
      name: 'درصد',

      data: [
        {name: '۷۵ سال به بالا', y: 3157, color: ECOLOR.COLOR6},
        {name: 'سال (۴۵-۳۱)', y: 177805, color: ECOLOR.COLOR3},
        {name: 'سال (۶۰-۴۶)', y: 166493, color: ECOLOR.COLOR4},
        {name: 'سال (۳۰-۱۶)', y: 96538, color: ECOLOR.COLOR2},
        {name: 'سال (۷۵-۶۱)', y: 63747, color: ECOLOR.COLOR5},
        {name: 'سال (۱۵-۰)', y: 55178, color: ECOLOR.COLOR1},
      ],
    },
  ],
} as any;
const GetAgeRange = (data: string) => {
  switch (data) {
    case '0-15':
      return 'سال (۱۵-۰)';
    case '16-30':
      return 'سال (۳۰-۱۶)';
    case '31-45':
      return 'سال (۴۵-۳۱)';
    case '46-60':
      return 'سال (۶۰-۴۶)';
    case '61-75':
      return 'سال (۷۵-۶۱)';
    case '76-up':
      return '۷۵ سال به بالا';
    default:
      return '';
  }
};
export default function useGetOverviewOfArbaeenPilgrimAgeStatus(
  query: any,
  hasProvince: boolean = false
) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(false);
  const [dataCount, setDataCount] = useState<any>(initialDataCount);
  const [dataPercentage, setDataPercentage] = useState<any>(initialDataPercentage);

  const {CancelToken} = axios;
  const source = CancelToken.source();

  const getIt = async ({retry, ...params}: any) => {
    try {
      setLoading(true);
      const res = await arbaeenService.getPiligrimAgeRange(params, {
        cancelToken: source.token,
      });

      const sortData = res.data.sort((a: any, b: any) =>
        Number(a.count) > Number(b.count) ? 1 : -1
      );
      const ageRange: any[] = [];
      const count: any[] = [];
      const countPercentage: any[] = [];

      sortData.forEach((item: any) => {
        ageRange.push(GetAgeRange(item.ageGroup));
        count.push(Number(item.count));
        countPercentage.push(Number(item.countPercentage));
      });
      const dataTempCount = {
        categories: [...ageRange],
        series: [
          {
            name: 'تعداد',
            data: [
              {
                name: ageRange[
                  ageRange.findIndex((i: any) => {
                    return i === 'سال (۱۵-۰)';
                  })
                ],
                y: count[
                  ageRange.findIndex((i: any) => {
                    return i === 'سال (۱۵-۰)';
                  })
                ],
                color: ECOLOR.COLOR1,
              },

              {
                name: ageRange[
                  ageRange.findIndex((i: any) => {
                    return i === 'سال (۳۰-۱۶)';
                  })
                ],
                y: count[
                  ageRange.findIndex((i: any) => {
                    return i === 'سال (۳۰-۱۶)';
                  })
                ],
                color: ECOLOR.COLOR2,
              },
              {
                name: ageRange[
                  ageRange.findIndex((i: any) => {
                    return i === 'سال (۴۵-۳۱)';
                  })
                ],
                y: count[
                  ageRange.findIndex((i: any) => {
                    return i === 'سال (۴۵-۳۱)';
                  })
                ],
                color: ECOLOR.COLOR3,
              },
              {
                name: ageRange[
                  ageRange.findIndex((i: any) => {
                    return i === 'سال (۶۰-۴۶)';
                  })
                ],
                y: count[
                  ageRange.findIndex((i: any) => {
                    return i === 'سال (۶۰-۴۶)';
                  })
                ],
                color: ECOLOR.COLOR4,
              },
              {
                name: ageRange[
                  ageRange.findIndex((i: any) => {
                    return i === 'سال (۷۵-۶۱)';
                  })
                ],
                y: count[
                  ageRange.findIndex((i: any) => {
                    return i === 'سال (۷۵-۶۱)';
                  })
                ],
                color: ECOLOR.COLOR5,
              },
              {
                name: ageRange[
                  ageRange.findIndex((i: any) => {
                    return i === '۷۵ سال به بالا';
                  })
                ],
                y: count[
                  ageRange.findIndex((i: any) => {
                    return i === '۷۵ سال به بالا';
                  })
                ],
                color: ECOLOR.COLOR6,
              },
            ],
          },
        ],
      } as any;
      setDataCount(dataTempCount);
      const dataTempPercentage = {
        categories: [...ageRange],
        series: [
          {
            name: 'درصد',
            data: [
              {
                name: ageRange[
                  ageRange.findIndex((i: any) => {
                    return i === 'سال (۱۵-۰)';
                  })
                ],
                y: countPercentage[
                  ageRange.findIndex((i: any) => {
                    return i === 'سال (۱۵-۰)';
                  })
                ],
                color: ECOLOR.COLOR1,
              },

              {
                name: ageRange[
                  ageRange.findIndex((i: any) => {
                    return i === 'سال (۳۰-۱۶)';
                  })
                ],
                y: countPercentage[
                  ageRange.findIndex((i: any) => {
                    return i === 'سال (۳۰-۱۶)';
                  })
                ],
                color: ECOLOR.COLOR2,
              },
              {
                name: ageRange[
                  ageRange.findIndex((i: any) => {
                    return i === 'سال (۴۵-۳۱)';
                  })
                ],
                y: countPercentage[
                  ageRange.findIndex((i: any) => {
                    return i === 'سال (۴۵-۳۱)';
                  })
                ],
                color: ECOLOR.COLOR3,
              },
              {
                name: ageRange[
                  ageRange.findIndex((i: any) => {
                    return i === 'سال (۶۰-۴۶)';
                  })
                ],
                y: countPercentage[
                  ageRange.findIndex((i: any) => {
                    return i === 'سال (۶۰-۴۶)';
                  })
                ],
                color: ECOLOR.COLOR4,
              },
              {
                name: ageRange[
                  ageRange.findIndex((i: any) => {
                    return i === 'سال (۷۵-۶۱)';
                  })
                ],
                y: countPercentage[
                  ageRange.findIndex((i: any) => {
                    return i === 'سال (۷۵-۶۱)';
                  })
                ],
                color: ECOLOR.COLOR5,
              },
              {
                name: ageRange[
                  ageRange.findIndex((i: any) => {
                    return i === '۷۵ سال به بالا';
                  })
                ],
                y: countPercentage[
                  ageRange.findIndex((i: any) => {
                    return i === '۷۵ سال به بالا';
                  })
                ],
                color: ECOLOR.COLOR6,
              },
            ],
          },
        ],
      } as any;
      setDataPercentage(dataTempPercentage);
      setError(false);
      setLoading(false);
    } catch (err: any) {
      if (err.message === 'cancel') {
        setLoading(true);
        return;
      }
      setError(err.message || EERRORS.ERROR_500);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasProvince) {
      return;
    }
    getIt(query);
    // eslint-disable-next-line consistent-return
    return () => {
      setDataCount(initialDataCount);
      setDataPercentage(initialDataPercentage);
      source.cancel('Operation canceled by the user.');
    };
  }, [query]);
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    if (!hasProvince) {
      return;
    }
    const params = new URLSearchParams(location.search);
    const provinceName = params.get('provinceName') || ('تهران' as any);
    const existsCity = sideCities.some((item: any) => {
      return item.name === provinceName;
    });

    if (existsCity) {
      getIt({...query, province: provinceName});
    } else {
      history.go(-1);
    }
    // eslint-disable-next-line consistent-return
    return () => {
      setDataCount(initialDataCount);
      setDataPercentage(initialDataPercentage);

      source.cancel('Operation canceled by the user.');
    };
  }, [location.search, query]);

  return {loading, error, dataCount, dataPercentage};
}
