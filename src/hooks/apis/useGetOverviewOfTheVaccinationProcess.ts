import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import {convertGregorianDateToJalaliDate, sideCities} from '../../helpers/utils';
import {EERRORS} from '../../constants/errors.enum';

const initialData = {
  categories: [],
  series: [
    {
      name: 'دوز اول',
      data: [],
    },
    {
      name: 'دوز دوم',
      data: [],
    },
    {
      name: 'دوز سوم',
      data: [],
    },
    {
      name: 'دوز چهارم',
      data: [],
    },
    {
      name: 'دوز پنجم',
      data: [],
    },
  ],
} as any;

export default function useGetOverviewOfTheVaccinationProcess(
  query: any,
  hasProvince: boolean = false
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false) as any;
  const [data, setData] = useState<any[]>(initialData) as any;

  const {CancelToken} = axios;
  const source = CancelToken.source();

  // eslint-disable-next-line


  const location = useLocation();




  return {loading, error, data};
}
