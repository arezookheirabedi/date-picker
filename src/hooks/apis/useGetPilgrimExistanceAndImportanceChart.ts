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
  const getBorders = (border: string) => {
    switch (border) {
      case '3':
        return 'شلمچه';
      case '4':
        return 'چذابه';
      case '1':
        return 'مهران';
      case '2':
        return 'خسروی';
      case '500001':
        return 'باشماق';
      case '500002':
        return 'تمرچین';
      default:
        return '';
    }
  };

  const {CancelToken} = axios;
  const source = CancelToken.source();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getIt = async ({retry, ...params}: any) => {
    setLoading(true);
    setError(null);
    try {
      const res = await arbaeenService.getPilgrimExistanceAndImportanceChart(params, {
        cancelToken: source.token,
      });
      const borders: any[] = [];
      const enteringCount: any[] = [];
      const exitingCount: any[] = [];
      const sortData = res.data.sort((a: any, b: any) =>
        a.exitingCount > b.exitingCount ? 1 : -1
      );

      sortData.forEach((item: any) => {
        enteringCount.push(item.enteringCount);
        exitingCount.push(item.exitingCount);
        borders.push(getBorders(item.borderId));
      });
      setData(() => {
        return {
          categories: [...borders],
          series: [
            {
              name: 'مسافران وارد شده',
              color: '#07816c',
              data: [...enteringCount],
            },
            {
              name: ' مسافران خارج شده',
              color: '#c20a0c',
              data: [...exitingCount],
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
