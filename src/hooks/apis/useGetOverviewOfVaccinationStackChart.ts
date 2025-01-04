import {useEffect, useState} from 'react';
import axios from 'axios';
import {EERRORS} from "../../constants/errors.enum";

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

export default function useGetOverviewOfVaccinationStackChart(query: any) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null) as any;
  const [data, setData] = useState<any>(initialData);

  const {CancelToken} = axios;
  const source = CancelToken.source();



  return {loading, error, data};
}
