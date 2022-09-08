import {useEffect, useState} from 'react';
import axios from 'axios';
import arbaeenService from 'src/services/arbaeen.service';
import {ECOLOR} from 'src/constants/color.enum';
import {EERRORS} from '../../constants/errors.enum';

const initialData = {
  categories: [],
  series: [
    {
      name: 'درصد زائران',
      color: ECOLOR.COLOR6,
      data: [],
    },
  ],
} as any;

export default function useGetPilgrimPercentagePerProvince(query: any) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null) as any;
  const [data, setData] = useState<any>(initialData);

  const {CancelToken} = axios;
  const source = CancelToken.source();

  const getIt = async ({retry, ...params}: any) => {
    setLoading(true);
    setError(null);
    try {
      const res = await arbaeenService.getPligrimCountPerProvince(
        {
          ...params,
        },
        {cancelToken: source.token}
      );
      const provinces: any[] = [];
      const pilgrimPercentage: any[] = [];
      const sortData = res.data.sort((a: any, b: any) =>
        a.countPercentage > b.countPercentage ? 1 : -1
      );

      sortData.forEach((item: any) => {
        pilgrimPercentage.push(item.countPercentage);
        provinces.push(item.province);
      });

      setData(() => {
        return {
          categories: provinces,
          series: [
            {
              name: 'درصد زائران',
              color: ECOLOR.COLOR6,
              data: [...pilgrimPercentage],
            },
          ],
        };
      });
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
    setInterval(() => {
      getIt(query);
    },(60000 * 5))
    // eslint-disable-next-line consistent-return
    return () => {
      setData(initialData);
      setError(null);
      source.cancel('Operation canceled by the user.');
    };
  }, [query]);

  return {loading, error, data};
}
