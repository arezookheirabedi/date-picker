import {useEffect, useState} from 'react';
import axios from 'axios';
import {toPersianDigit} from 'src/helpers/utils';
import dayjs from 'dayjs';
import {useLocation} from 'react-router-dom';
import {EERRORS} from '../../constants/errors.enum';
import {getProvinceParam} from '../../helpers/utils';

export default function useGetTheProcessOfTheEntryAndExitOfPilgrimsBasedOnSelfReportInfo(
  query: any,
  hasProvince: boolean = false
) {
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


  const location = useLocation();


  return {loading, error, data};
}
