import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import axios from "axios";
import {sideCities} from "../../helpers/utils";
import {EERRORS} from "../../constants/errors.enum";

const initialData = {
  categories: ['دوز اول', 'دوز دوم', 'دوز سوم', 'دوز چهارم', 'دوز پنجم', 'واکسن نزده ها'],
  series: [
    {
      name: 'واکسیناسیون',
      data: [
        {name: 'دوز اول', y: 0, color: '#F3BC06'},
        {name: 'دوز دوم', y: 0, color: '#209F92'},
        {name: 'دوز سوم', y: 0, color: '#004D65'},
        {name: 'دوز چهارم', y: 0, color: '#BFDDE7'},
        {name: 'دوز پنجم', y: 0, color: '#716DE3'},
        {name: 'واکسن نزده ها', y: 0, color: '#FF0060'},
      ],
    },
  ]
} as any;

export default function useGetOverviewOfTheLatestVaccinationStatusColumnChart(query: any, hasProvince: boolean = false) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(false);
  const [data, setData] = useState<any>(initialData);

  const {CancelToken} = axios;
  const source = CancelToken.source();



  return {loading, error, data};
}