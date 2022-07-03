import {useEffect, useState} from "react";
import {useHistory, useLocation} from "react-router-dom";
import axios from "axios";
import hcsService from "../../services/hcs.service";
import {sideCities} from "../../helpers/utils";

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

  const getIt = async (params: any) => {

    try {
      setLoading(true);
      const {data: result} = await hcsService.getPeopleVaccine(
        params,
        {cancelToken: source.token}
      );

      const initialDoses = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0};
      const dosesToTotalPopulationPercentage = {...initialDoses, ...result.dosesToTotalPopulationPercentage}
      const dataTemp = {
        categories: ['دوز اول', 'دوز دوم', 'دوز سوم', 'دوز چهارم', 'دوز پنجم', 'واکسن نزده ها'],
        series: [
          {
            name: 'واکسیناسیون',
            data: [
              {name: 'دوز اول', y: dosesToTotalPopulationPercentage['1'], color: '#F3BC06'},
              {name: 'دوز دوم', y: dosesToTotalPopulationPercentage['2'], color: '#209F92'},
              {name: 'دوز سوم', y: dosesToTotalPopulationPercentage['3'], color: '#004D65'},
              {name: 'دوز چهارم', y: dosesToTotalPopulationPercentage['4'], color: '#BFDDE7'},
              {name: 'دوز پنجم', y: dosesToTotalPopulationPercentage['5'], color: '#716DE3'},
              {
                name: 'واکسن نزده ها',
                y: result.totalNonVaccinesCountToTotalPopulationPercentage || 0,
                color: '#FF0060'
              },
            ],
          },
        ]
      } as any;

      setData(dataTemp)
      setError(null);
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      if (err.message === 'cancel') {
        setLoading(true);
        return;
      }
      // eslint-disable-next-line
      console.log(err);
      setError(err.message || '')
    }
  };

  useEffect(() => {
    if (hasProvince) {
      return;
    }
    getIt(query);
    // eslint-disable-next-line consistent-return
    return () => {
      setData(initialData);
      source.cancel('Operation canceled by the user.');
    };
  }, []);

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (!hasProvince) {
      return;
    }
    const params = new URLSearchParams(location.search);
    const provinceName = params.get('provinceName') || ('تهران' as any);
    const existsCity = sideCities.some((item: any) => {
      return item.name === provinceName;
    });
    if (existsCity) {
      getIt({...query, 'province': provinceName});
    } else {
      history.push('/dashboard/health/transport/province');
    }
    // eslint-disable-next-line consistent-return
    return () => {
      setData(initialData);
      source.cancel('Operation canceled by the user.');
    };
  }, [location.search]);

  return {loading, error, data};
}