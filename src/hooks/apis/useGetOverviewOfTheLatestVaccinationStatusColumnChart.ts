import {useEffect, useState} from "react";
import axios from "axios";
import hcsService from "../../services/hcs.service";

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

export default function useGetOverviewOfTheLatestVaccinationStatusColumnChart(query: any) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<any>(initialData);

  const {CancelToken} = axios;
  const source = CancelToken.source();

  const getIt = async (params: any) => {
    setLoading(true);
    try {
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
    } catch (err: any) {
      // eslint-disable-next-line
      console.log(err);
      setError(err.message || '')
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getIt(query);
    return () => {
      setData(initialData);
      source.cancel('Operation canceled by the user.');
    };
  }, []);

  return {loading, error, data};
}