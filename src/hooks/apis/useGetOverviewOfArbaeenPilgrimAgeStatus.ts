import {useEffect, useState} from 'react';
import axios from 'axios';
import arbaeenService from 'src/services/arbaeen.service';
import {EERRORS} from '../../constants/errors.enum';

const initialData = {
  categories: [
    'سال (۱۵-۰)',
    'سال (۳۰-۱۶)',
    'سال (۴۵-۳۱)',
    ' سال (۶۰-۴۶)',
    ' سال (۷۵-۶۱)',
    '۷۵ سال به بالا ',
  ],
  series: [
    {
      name: 'تعداد',

      data: [
        {name: 'سال (۱۵-۰)', y: 0, color: '#716DE3'},
        {name: 'سال (۳۰-۱۶)', y: 0, color: '#BFDDE7'},
        {name: 'سال (۴۵-۳۱)', y: 0, color: '#004D65'},
        {name: ' سال (۶۰-۴۶)', y: 0, color: '#209F92'},
        {name: ' سال (۷۵-۶۱)', y: 0, color: '#F3BC06'},
        {name: '۷۵ سال به بالا ', y: 0, color: '#8800ff'},
      ],
    },
  ],
} as any;

export default function useGetOverviewOfArbaeenPilgrimAgeStatus(query: any) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(false);
  const [data, setData] = useState<any>(initialData);

  const {CancelToken} = axios;
  const source = CancelToken.source();

  const getIt = async ({retry, ...params}: any) => {
    try {
      setLoading(true);
      const res = await arbaeenService.getPligrimCountPerBorder(params, {
        cancelToken: source.token,
      });

      const border: any[] = [];
      const count: any[] = [];
      res.data.forEach((item: any) => {
        border.push(item.departureDestinationBorder);
        count.push(item.count);
      });
      const newBorder = border.filter((i: any) => i !== 'MEHRAN');
      const newBorder2 = newBorder.filter((i: any) => i !== 'CHAZABE');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const dataTemp = {
        categories: [...newBorder2],
        series: [
          {
            name: 'تعداد',
            data: [
              {
                name: border[
                  border.findIndex((i: any) => {
                    return i === 'هوایی';
                  })
                ],
                y: count[
                  border.findIndex((i: any) => {
                    return i === 'هوایی';
                  })
                ],
                color: '#716DE3',
              },

              {
                name: border[
                  border.findIndex((i: any) => {
                    return i === 'شلمچه';
                  })
                ],
                y: count[
                  border.findIndex((i: any) => {
                    return i === 'شلمچه';
                  })
                ],
                color: '#004D65',
              },
              {
                name: border[
                  border.findIndex((i: any) => {
                    return i === 'خسروی';
                  })
                ],
                y: count[
                  border.findIndex((i: any) => {
                    return i === 'خسروی';
                  })
                ],
                color: '#BFDDE7',
              },
              {
                name: border[
                  border.findIndex((i: any) => {
                    return i === 'چزابه';
                  })
                ],
                y: count[
                  border.findIndex((i: any) => {
                    return i === 'چزابه';
                  })
                ],
                color: '#716DE3',
              },
              {
                name: border[
                  border.findIndex((i: any) => {
                    return i === 'مهران';
                  })
                ],
                y: count[
                  border.findIndex((i: any) => {
                    return i === 'مهران';
                  })
                ],
                color: '#FF0060',
              },
              {
                name: border[
                  border.findIndex((i: any) => {
                    return i === 'باشماق';
                  })
                ],
                y: count[
                  border.findIndex((i: any) => {
                    return i === 'باشماق';
                  })
                ],
                color: '#F3BC06',
              },
              {
                name: border[
                  border.findIndex((i: any) => {
                    return i === 'تمرچین';
                  })
                ],
                y: count[
                  border.findIndex((i: any) => {
                    return i === 'تمرچین';
                  })
                ],
                color: '#8800ff',
              },
            ],
          },
        ],
      } as any;

      setData(initialData);
      // setData(dataTemp);
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
