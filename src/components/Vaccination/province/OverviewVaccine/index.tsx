import React, {useEffect, useState} from 'react';
import {cancelTokenSource, msgRequestCanceled, sideCities} from 'src/helpers/utils';
import vaccineService from 'src/services/vaccine.service';
import {useHistory, useLocation} from 'react-router-dom';
import hcsService from 'src/services/hcs.service';
import {IInitialVacinatelInfo, initialVacinatelInfo} from '../../public/constant';
import OverViewVaccinationPercentageStatus from './OverviewVaccinePercentage';
import OverviewVaccinationStatus from './OverviewVaccineCount';

const OverviewVaccine: React.FC<{cityTitle: string}> = ({cityTitle}) => {
  const location = useLocation();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [numberOf, setNumberOf] = useState<IInitialVacinatelInfo>(initialVacinatelInfo);
  const [thelatestNumberOf, setThelatestNumberOf] =
    useState<IInitialVacinatelInfo>(initialVacinatelInfo);
  const [theLatestloading, setTheLatestLoading] = useState(false);

  const cancelToken = cancelTokenSource();

  function cancelRequest() {
    cancelToken.cancel(msgRequestCanceled);
  }

  const getNumberOf = async (provinceName: string) => {
    setLoading(true);
    try {
      const {data} = await vaccineService.membersGeneral(
        {province: provinceName},
        {cancelToken: cancelToken.token}
      );

      setNumberOf((prev: any) => {
        return {
          ...prev,
          ...data,
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
    if (existsCity) {
      getNumberOf(provinceName);
      getTheLatestNumber({province:provinceName});
    } else {
      history.push('/dashboard/vaccination/province');
    }

    return () => {
      cancelRequest();
      setNumberOf(initialVacinatelInfo);
      setThelatestNumberOf(initialVacinatelInfo);
    };
  }, [location.search]);

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
    </div>
  );
};

export default OverviewVaccine;
