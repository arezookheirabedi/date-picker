import React, {useEffect, useState} from 'react';
import {cancelTokenSource, msgRequestCanceled, sideCities} from 'src/helpers/utils';
import vaccineService from 'src/services/vaccine.service';
import {useHistory, useLocation} from 'react-router-dom';
import hcsService from 'src/services/hcs.service';
import { isEmpty } from 'lodash';
import {IInitialVacinatelInfo, initialVacinatelInfo} from '../../public/constant';
import OverViewVaccinationPercentageStatus from './OverviewVaccinePercentage';
import OverviewVaccinationStatus from './OverviewVaccineCount';
import OverviewVaccinePerDoses from './OverviewVaccinePerDoses';

const OverviewVaccine: React.FC<{cityTitle: string}> = ({cityTitle}) => {
  const location = useLocation();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [numberOf, setNumberOf] = useState<IInitialVacinatelInfo>(initialVacinatelInfo);
  const [thelatestNumberOf, setThelatestNumberOf] =
    useState<IInitialVacinatelInfo>(initialVacinatelInfo);
  const [theLatestloading, setTheLatestLoading] = useState(false);
  const [chartData, setChartData] = useState<any>();
  const [queryParams, setQueryParams] = useState({
    from: null,
    to: null,
  });

  const cancelToken = cancelTokenSource();

  function cancelRequest() {
    cancelToken.cancel(msgRequestCanceled);
  }

  const getNumberOf = async (provinceName: string) => {
    // setLoading(true);
    // try {
    //   const {data} = await vaccineService.membersGeneral(
    //     {province: provinceName},
    //     {cancelToken: cancelToken.token}
    //   );
    setErrorMessage(null);
    setLoading(true);
    try {
      const res =  await vaccineService.membersGeneral(
            {province: provinceName},
            {cancelToken: cancelToken.token}
          );
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

      setNumberOf((prev: any) => {
        return {
          ...prev,
          ...finalResponse,
        };
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const getTheLatestNumber = async (params: any) => {
    setTheLatestLoading(true);
    try {
      const res = await hcsService.peopleLatestVaccinationOverview(params, {
        cancelToken: cancelToken.token,
      });
      const finalResponse: any = {...res.data};
      setThelatestNumberOf(finalResponse);
    } catch (error: any) {
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setTheLatestLoading(false);
    }
  };
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const provinceName = params.get('provinceName') || ('تهران' as any);
    const existsCity = sideCities.some((item: any) => {
      return item.name === provinceName;
    });
    const idSetTimeOut = setTimeout(() => {

    if (existsCity) {
      getNumberOf(provinceName);
      getTheLatestNumber({province:provinceName});
    } else {
      history.push('/dashboard/vaccination/province');
    }
  }, 500);

    return () => {
      clearTimeout(idSetTimeOut);
      cancelRequest();
      setNumberOf(initialVacinatelInfo);
      setThelatestNumberOf(initialVacinatelInfo);
    };
  }, [queryParams, location.search,location.search]);

  return (
    <div id="vaccination-overview">
      <fieldset className="mb-16 rounded-xl border p-4 text-center">
        <legend className="mx-auto px-3 text-black">
          نگاه کلی به وضعیت واکسیناسیون در استان {cityTitle}
        </legend>
        <OverviewVaccinationStatus loading={loading} numberOf={numberOf} />
      </fieldset>
      <fieldset className="mb-16 rounded-xl border p-4 text-center">
        <legend className="mx-auto px-3 text-black">
          نگاه کلی به درصد واکسیناسیون در استان {cityTitle}
        </legend>
        <OverViewVaccinationPercentageStatus
          theLatestloading={theLatestloading}
          thelatestNumberOf={thelatestNumberOf}
          loading={loading}
          numberOf={numberOf}
        />

</fieldset>
<fieldset className="mb-16 rounded-xl border p-4 text-center">
<legend className="mx-auto px-3 text-black">
نگاه کلی به وضعیت واکسیناسیون استان {cityTitle}
        </legend>

<OverviewVaccinePerDoses
    loading={loading}
    numberOf={chartData}
    setQueryParams={setQueryParams}
    queryParams={queryParams}
    errorMessage={errorMessage}
      />
      </fieldset>
    </div>
  );
};

export default OverviewVaccine;
