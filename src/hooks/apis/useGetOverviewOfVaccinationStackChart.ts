import {useEffect, useState} from 'react';
import axios from 'axios';
import hcsService from '../../services/hcs.service';

const initialData = {
  categories: [],
  series: [
    {
      name: 'واکسن نزده',
      color: '#FF0060',
      data: [],
    },
    {
      name: 'دوز اول',
      color: '#F3BC06',
      data: [],
    },
    {
      name: 'دوز دوم',
      color: '#209F92',
      data: [],
    },
    {
      name: 'دوز سوم',
      color: '#004D65',
      data: [],
    },
    {
      name: 'دوز چهارم',
      color: '#BFDDE7',
      data: [],
    },
    {
      name: 'دوز پنجم',
      color: '#716DE3',
      data: [],
    },
  ],
} as any;

export default function useGetOverviewOfVaccinationStackChart(query: any, shouldUpdate?: boolean) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null) as any;
  const [data, setData] = useState<any>(initialData);

  const {CancelToken} = axios;
  const source = CancelToken.source();

  const getIt = async (params: any) => {
    setLoading(true);
    setError(null);
    try {
      const {data: result} = await hcsService.getVaccinesGroupedByProvinceReport(
        {
          ...params,
        },
        {cancelToken: source.token}
      );

      const provinces: any[] = [];

      // eslint-disable-next-line
      let firstDose: any[] = [];
      // eslint-disable-next-line
      let secondDose: any[] = [];
      // eslint-disable-next-line
      let thirdDose: any[] = [];
      // eslint-disable-next-line
      // eslint-disable-next-line
      let forthDose: any[] = [];
      // eslint-disable-next-line
      let fifthDose: any[] = [];
      const initialDoses = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0};
      // eslint-disable-next-line
      let noDose: any[] = [];

      result.forEach((item: any) => {
        // eslint-disable-next-line
        for (const [key, value] of Object.entries({...initialDoses, ...item.doses})) {
          if (Number(key) === 1) {
            firstDose.push(Number(value));
          }

          if (Number(key) === 2) {
            secondDose.push(Number(value));
          }

          if (Number(key) === 3) {
            thirdDose.push(Number(value));
          }

          if (Number(key) === 4) {
            forthDose.push(Number(value));
          }

          if (Number(key) === 5) {
            fifthDose.push(Number(value));
          }
        }

        noDose.push(Number(item.totalNonVaccinesCount || 0));
        provinces.push(item.province);
      });

      setData(() => {
        return {
          categories: provinces,
          series: [
            {
              name: 'واکسن نزده',
              color: '#FF0060',
              data: [...noDose],
            },
            {
              name: 'دوز اول',
              color: '#F3BC06',
              data: [...firstDose],
            },
            {
              name: 'دوز دوم',
              color: '#209F92',
              data: [...secondDose],
            },
            {
              name: 'دوز سوم',
              color: '#004D65',
              data: [...thirdDose],
            },
            {
              name: 'دوز چهارم',
              color: '#BFDDE7',
              data: [...forthDose],
            },
            {
              name: 'دوز پنجم',
              color: '#716DE3',
              data: [...fifthDose],
            },
          ],
        };
      });
    } catch (err: any) {
      if (err.message === 'cancel') {
        return;
      }
      setError('خطا در اتصال به سرویس');
      // eslint-disable-next-line
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getIt(query);
    return () => {
      setData(initialData);
      setError(null);
      source.cancel('Operation canceled by the user.');
    };
  }, [query, shouldUpdate]);

  return {loading, error, data};
}
