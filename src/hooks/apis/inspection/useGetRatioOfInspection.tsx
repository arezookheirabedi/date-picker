import {useEffect, useState} from 'react';
import axios from 'axios';
import inspectionService from 'src/services/inspection.service';
import {EERRORS} from '../../../constants/errors.enum';

const initialData = {
  categories: [],
  series: [
    {
      name: 'نیاز به بازرسی',
      color: '#F3BC06',
      data: [],
    },
    {
      name: 'بازرسی‌های انجام شده',
      color: '#07816C',
      data: [],
    },
  ],
} as any;

export default function useGetRatioOfInspection(query: any) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null) as any;
  const [data, setData] = useState<any>(initialData);

  const {CancelToken} = axios;
  const source = CancelToken.source();

  const getIt = async ({retry, ...params}: any) => {
    setLoading(true);
    setError(null);
    try {
      const res = await inspectionService.ratioOfInspection(
        {
          ...params,
        },
        {cancelToken: source.token}
      );
      const provinces: any[] = [];
      const inspectionCount: any[] = [];
      const neededToInspectionCount: any[] = [];
      const sortData = res.data.sort((a: any, b: any) =>
        a.inspectionCount > b.inspectionCount ? 1 : -1
      );

      sortData.forEach((item: any) => {
        inspectionCount.push(item.inspectionCount || 0);
        neededToInspectionCount.push(item.neededToInspectionCount || 0);
        provinces.push(item.province || '');
      });

      setData(() => {
        return {
          categories: provinces,
          series: [
            {
              name: 'نیاز به بازرسی',
              color: '#F3BC06',
              data: [...neededToInspectionCount],
            },
            {
              name: 'بازرسی‌های انجام شده',
              color: '#07816C',
              data: [...inspectionCount],
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
