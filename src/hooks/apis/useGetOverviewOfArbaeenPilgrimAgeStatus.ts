import {useEffect, useState} from 'react';
import axios from 'axios';
import arbaeenService from 'src/services/arbaeen.service';
import {EERRORS} from '../../constants/errors.enum';

const initialData = {
  categories: [
    '۷۵ سال به بالا ',
    'سال (۱۵-۰)',
    ' سال (۷۵-۶۱)',
    'سال (۳۰-۱۶)',
    ' سال (۶۰-۴۶)',
    'سال (۴۵-۳۱)',
  ],
  series: [
    {
      name: 'تعداد',

      data: [
        {name: '۷۵ سال به بالا ', y: 3157, color: '#8800ff'},
        {name: 'سال (۴۵-۳۱)', y: 177805, color: '#004D65'},
        {name: ' سال (۶۰-۴۶)', y: 166493, color: '#209F92'},
        {name: 'سال (۳۰-۱۶)', y: 96538, color: '#BFDDE7'},
        {name: ' سال (۷۵-۶۱)', y: 63747, color: '#F3BC06'},
        {name: 'سال (۱۵-۰)', y: 55178, color: '#ff0060'},
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
      return ' سال (۷۵-۶۱)';
    case '76-up':
      return '۷۵ سال به بالا ';
    default:
      return '';
  }
};
export default function useGetOverviewOfArbaeenPilgrimAgeStatus(query: any) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(false);
  const [data, setData] = useState<any>(initialData);

  const {CancelToken} = axios;
  const source = CancelToken.source();

  const getIt = async ({retry, ...params}: any) => {
    try {
      setLoading(true);
      const res = await arbaeenService.getPiligrimAgeRange(params, {
        cancelToken: source.token,
      });
      const sortData = res.data.sort((a: any, b: any) => (a.count > b.count ? 1 : -1));
      const ageRange: any[] = [];
      const count: any[] = [];
      sortData.forEach((item: any) => {
        ageRange.push(GetAgeRange(item.ageGroup));
        count.push(Number(item.count));
      });

      const dataTemp = {
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
                color: '#ff0060',
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
                color: '#BFDDE7',
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
                color: '#004D65',
              },
              {
                name: ageRange[
                  ageRange.findIndex((i: any) => {
                    return i === ' سال (۶۰-۴۶)';
                  })
                ],
                y: count[
                  ageRange.findIndex((i: any) => {
                    return i === ' سال (۶۰-۴۶)';
                  })
                ],
                color: '#716DE3',
              },
              {
                name: ageRange[
                  ageRange.findIndex((i: any) => {
                    return i === ' سال (۷۵-۶۱)';
                  })
                ],
                y: count[
                  ageRange.findIndex((i: any) => {
                    return i === ' سال (۷۵-۶۱)';
                  })
                ],
                color: '#FF0060',
              },
              {
                name: ageRange[
                  ageRange.findIndex((i: any) => {
                    return i === '۷۵ سال به بالا ';
                  })
                ],
                y: count[
                  ageRange.findIndex((i: any) => {
                    return i === '۷۵ سال به بالا ';
                  })
                ],
                color: '#F3BC06',
              },
            ],
          },
        ],
      } as any;
      debugger;
      // setData(initialData);
      setData(dataTemp);
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
    getIt(query);
    // eslint-disable-next-line consistent-return
    return () => {
      setData(initialData);
      source.cancel('Operation canceled by the user.');
    };
  }, [query]);

  return {loading, error, data};
}
