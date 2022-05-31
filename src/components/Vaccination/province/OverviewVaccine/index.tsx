import React, {useEffect, useState} from 'react';
import {cancelTokenSource, msgRequestCanceled, sideCities} from 'src/helpers/utils';
import vaccineService from 'src/services/vaccine.service';
import {useHistory, useLocation} from 'react-router-dom';
import {IInitialVacinatelInfo, initialVacinatelInfo} from '../../public/constant';
import OverViewVaccinationPercentageStatus from './OverviewVaccinePercentage';
import OverviewVaccinationStatus from './OverviewVaccineCount';

const OverviewVaccine: React.FC<{cityTitle: string}> = ({cityTitle}) => {
  const location = useLocation();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [numberOf, setNumberOf] = useState<IInitialVacinatelInfo>(initialVacinatelInfo);

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

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const provinceName = params.get('provinceName') || ('تهران' as any);
    const existsCity = sideCities.some((item: any) => {
      return item.name === provinceName;
    });
    if (existsCity) {
      getNumberOf(provinceName);
    } else {
      history.push('/dashboard/vaccination/province');
    }

    return () => {
      cancelRequest();
      setNumberOf(initialVacinatelInfo);
    };
  }, [location.search]);

  return (
    <div id="vaccination-overview">
      <fieldset className="text-center border rounded-xl p-4 mb-16">
        <legend className="text-black mx-auto px-3">
          نگاه کلی به وضعیت واکسیناسیون در استان {cityTitle}
        </legend>
        <OverviewVaccinationStatus loading={loading} numberOf={numberOf} />
      </fieldset>
      <fieldset className="text-center border rounded-xl p-4 mb-16">
        <legend className="text-black mx-auto px-3">
          نگاه کلی به درصد واکسیناسیون در استان {cityTitle}
        </legend>
        <OverViewVaccinationPercentageStatus loading={loading} numberOf={numberOf} />
      </fieldset>
    </div>
  );
};

export default OverviewVaccine;
