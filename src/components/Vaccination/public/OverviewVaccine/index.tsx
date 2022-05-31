import React, {useEffect, useState} from 'react';
import {cancelTokenSource, msgRequestCanceled} from 'src/helpers/utils';
import vaccineService from 'src/services/vaccine.service';
import {IInitialVacinatelInfo, initialVacinatelInfo} from '../constant';
import OverViewVaccinationPercentageStatus from './OverviewVaccinePercentage';
import OverviewVaccinationStatus from './OverviewVaccineCount';

const OverviewVaccine: React.FC<{}> = () => {
  const [loading, setLoading] = useState(false);
  const [numberOf, setNumberOf] = useState<IInitialVacinatelInfo>(initialVacinatelInfo);

  const cancelToken = cancelTokenSource();

  function cancelRequest() {
    cancelToken.cancel(msgRequestCanceled);
  }

  /*  */
  const getNumberOf = async () => {
    setLoading(true);
    try {
      const {data} = await vaccineService.membersGeneral({}, {cancelToken: cancelToken.token});
      setNumberOf({...data});
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNumberOf();
    return () => {
      cancelRequest();
      setNumberOf(initialVacinatelInfo);
    };
  }, []);

  return (
    <>
      <fieldset className="text-center border rounded-xl p-4 mb-16">
        <legend className="text-black mx-auto px-3">نگاه کلی به وضعیت واکسیناسیون کل کشور</legend>
        <OverviewVaccinationStatus loading={loading} numberOf={numberOf} />
      </fieldset>
      <fieldset className="text-center border rounded-xl p-4 mb-16">
        <legend className="text-black mx-auto px-3">نگاه کلی به درصد واکسیناسیون کل کشور</legend>
        <OverViewVaccinationPercentageStatus loading={loading} numberOf={numberOf} />
      </fieldset>
    </>
  );
};

export default OverviewVaccine;
