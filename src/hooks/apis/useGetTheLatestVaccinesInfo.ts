import {useEffect, useState} from 'react';
import hcsService from 'src/services/hcs.service';
import {cancelTokenSource, msgRequestCanceled} from 'src/helpers/utils';
import {isEmpty} from 'lodash';
import {IObjectOption} from './useGetNumberOf';

export const initialDoses = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, null: 0};
export const initialVacinatelInfo = {
  doses: {...initialDoses},
  dosesToTotalPopulationPercentage: {...initialDoses},
  gtDoses: {...initialDoses},
  totalPopulation: 0,
  totalNonVaccinesCount: 0,
  totalNonVaccinesCountToTotalPopulationPercentage: 0,
  totalVaccinesCountToTotalPopulationPercentage: 0,
  totalNonVaccinesCountBeforeStartOfSystemToTotalPopulationPercentage: 0,
  totalNonVaccinesCountBeforeStartOfSystem: 0,
  totalVaccinesCountAfterStartOfSystem: 0,
  totalVaccinesCount: 0,
  totalVaccinesCountAfterStartOfSystemToTotalPopulationPercentage: 0,
};
export interface IInitialVacinatelInfo {
  totalVaccinesCountAfterStartOfSystemToTotalPopulationPercentage: number;
  totalNonVaccinesCountBeforeStartOfSystemToTotalPopulationPercentage: number;
  totalPopulation: number;
  totalNonVaccinesCount: number;
  totalNonVaccinesCountToTotalPopulationPercentage: number;
  totalVaccinesCountToTotalPopulationPercentage: number;
  gtDoses: IObjectOption;
  doses: IObjectOption;
  dosesToTotalPopulationPercentage: IObjectOption;
  totalNonVaccinesCountBeforeStartOfSystem: number;
  totalVaccinesCountAfterStartOfSystem: number;
  totalVaccinesCount: number;
}

export default function useGetNumberOf(query?: any) {
  const [loading, setLoading] = useState(false);
  const [error, setErrorMessage] = useState(null);
  const [chartData, setChartData] = useState<any>();
  const [cartData, setCartData] = useState<IInitialVacinatelInfo>(initialVacinatelInfo);

  const cancelToken = cancelTokenSource();

  function cancelRequest() {
    cancelToken.cancel(msgRequestCanceled);
  }

  const getGuildVaccinateInfo = async (params: any = {}) => {
    setErrorMessage(null);
    setLoading(true);
    try {
      const res = await hcsService.peopleLatestVaccinationOverview(params, {
        cancelToken: cancelToken.token,
      });
      const finalResponse: any = {...res.data};
      if (!isEmpty(finalResponse)) {
        const dataChart: any = {
          null: 5,
          '0': finalResponse.totalNonVaccinesCountToTotalPopulationPercentage || 0, // واکسن نزدع
          '1': finalResponse.dosesToTotalPopulationPercentage[1] || 0, // دوز اول
          '2': finalResponse.dosesToTotalPopulationPercentage[2] || 0, // دوز دوم
          '3': finalResponse.dosesToTotalPopulationPercentage[3] || 0, // دوز سوم
          '4': finalResponse.dosesToTotalPopulationPercentage[4] || 0, // دوز چهارم
          '5': finalResponse.dosesToTotalPopulationPercentage[5] || 0, // دوز پنجم
        };

        // eslint-disable-next-line
        let firstDose: number = 0;
        // eslint-disable-next-line
        let secondDose: number = 0;
        // eslint-disable-next-line
        let thirdDose: number = 0;
        // eslint-disable-next-line
        let forthDoses: number = 0;
        // eslint-disable-next-line
        let fifthDoses: number = 0;
        // eslint-disable-next-line
        let noDose: number = 0;

        Object.entries(dataChart).forEach(([key, value]: any[]) => {
          switch (key) {
            case 'null':
              // noDose += value;
              break;
            case '0':
              noDose += value;
              break;
            case '1':
              firstDose += value;
              break;
            case '2':
              secondDose += value;
              break;
            case '3':
              thirdDose += value;
              break;
            case '4':
              forthDoses += value;
              break;
            case '5':
              fifthDoses += value;
              break;
            default:
              break;
          }
        });

        const newInitialData = {
          categories: ['دوز اول', 'دوز دوم', 'دوز سوم', 'دوز چهارم', 'دوز پنجم', 'واکسن نزده'],
          series: [
            {
              name: 'واکسیناسیون',
              data: [
                {name: 'دوز اول', y: firstDose, color: '#F3BC06'},
                {name: 'دوز دوم', y: secondDose, color: '#209F92'},
                {name: 'دوز سوم', y: thirdDose, color: '#004D65'},
                {name: ' دوز چهارم', y: forthDoses, color: '#bfdde7'},
                {name: 'دوز پنجم', y: fifthDoses, color: '#716de3'},
                {name: 'واکسن نزده', y: noDose, color: '#FF0060'},
              ],
            },
          ],
        } as any;

        setChartData({...newInitialData});
      }

      setCartData(finalResponse);
    } catch (errors: any) {
      setErrorMessage(errors.message || 'موردی برای نمایش وجود ندارد.');

      // eslint-disable-next-line
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getGuildVaccinateInfo(query);
    return () => {
      cancelRequest();
      setChartData({});
      setCartData({...initialVacinatelInfo});
    };
  }, [query]);

  return {loading, error, chartData, cartData};
}
