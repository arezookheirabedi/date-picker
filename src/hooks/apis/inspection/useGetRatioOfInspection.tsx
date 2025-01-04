import {useEffect, useState} from 'react';
import axios from 'axios';
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


  return {loading, error, data};
}
