import {useEffect, useState} from 'react';
import axios from 'axios';
import arbaeenService from 'src/services/arbaeen.service';
import {toPersianDigit} from 'src/helpers/utils';
import dayjs from 'dayjs';
import {EERRORS} from '../../constants/errors.enum';

export default function useGetOverviewPilgrimExistAndEntranceFromBorders(query: any) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(false);
  const [data, setData] = useState<any>([]);
  const {CancelToken} = axios;
  const source = CancelToken.source();

  const getTime = (value: string) => {
    const date = toPersianDigit(dayjs(value).calendar('jalali').format('YYYY/MM/DD'));
    return date;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getIt = async ({retry, ...params}: any) => {
    setLoading(true);
    try {
      const {data: result} = await arbaeenService.getEntranceAxndExistanceBorder(params, {
        cancelToken: source.token,
      });

      const date: any[] = [];
      const countExist: any[] = [];
      const countEntrance: any[] = [];
      result.forEach((item: any) => {
        date.push(getTime(item.dateTime));
        countExist.push(item.exitingCount);
        countEntrance.push(item.enteringCount);
      });

      setData(() => {
        return {
          categories: [...date],

          series: [
            {
              name: 'خروج',
              marker: {
                fillColor: 'transparent',
                lineColor: 'red',
              },
              data: [...countExist],
            },
            {
              name: 'ورود',
              marker: {
                fillColor: 'transparent',
                lineColor: 'green',
              },
              data: [...countEntrance],
            },
          ],
        };
      });
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
    setInterval(() => {
      getIt(query);
    }, 60000 * 5)
    return () => {
      setData([]);
      source.cancel('Operation canceled by the user.');
    };
  }, [query]);

  return {loading, error, data};
}
