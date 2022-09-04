import {useEffect, useState} from 'react';
import axios from 'axios';
import arbaeenService from 'src/services/arbaeen.service';
import {EERRORS} from '../../constants/errors.enum';

const initialData = {
  categories: [],
  series: [
    {
      name: 'مسافران وارد شده',
      color: '#07816c',
      data: [],
    },
    {
      name: ' مسافران خارج شده',
      color: '#c20a0c',
      data: [],
    },
  ],
} as any;

export default function useGetPilgrimExistanceAndImportanceChart(query: any) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null) as any;
  const [data, setData] = useState<any>(initialData);

  const {CancelToken} = axios;
  const source = CancelToken.source();

  const getIt = async ({retry, ...params}: any) => {
    setLoading(true);
    setError(null);
    try {
      const res = await arbaeenService.getPligrimGenderPerProvince(
        {
          ...params,
        },
        {cancelToken: source.token}
      );
      const provinces: any[] = [];
      const maleCount: any[] = [];
      const femaleCount: any[] = [];
      const sortData = res.data.sort((a: any, b: any) => (a.maleCount > b.maleCount ? 1 : -1));

      sortData.forEach((item: any) => {
        maleCount.push(item.maleCount);
        femaleCount.push(item.femaleCount);
        provinces.push(item.province);
      });

      setData(() => {
        return {
          categories: provinces,
          series: [
            {
              name: 'مسافران وارد شده',
              color: '#07816c',
              data: [...femaleCount],
            },
            {
              name: ' مسافران خارج شده',
              color: '#c20a0c',
              data: [...maleCount],
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
    // eslint-disable-next-line consistent-return
    return () => {
      setData(initialData);
      setError(null);
      source.cancel('Operation canceled by the user.');
    };
  }, [query]);

  return {loading, error, data};
}
