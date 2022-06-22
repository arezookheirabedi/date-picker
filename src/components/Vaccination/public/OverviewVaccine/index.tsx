import React, {useEffect, useState} from 'react';
import {cancelTokenSource, msgRequestCanceled} from 'src/helpers/utils';
import vaccineService from 'src/services/vaccine.service';
import hcsService from 'src/services/hcs.service';
import {IInitialVacinatelInfo, initialVacinatelInfo} from '../constant';
import OverViewVaccinationPercentageStatus from './OverviewVaccinePercentage';
import OverviewVaccinationStatus from './OverviewVaccineCount';

const OverviewVaccine: React.FC<{}> = () => {
  const [loading, setLoading] = useState(false);
  const [theLatestloading, setTheLatestLoading] = useState(false);
  const [numberOf, setNumberOf] = useState<IInitialVacinatelInfo>(initialVacinatelInfo);
  const [thelatestNumberOf, setThelatestNumberOf] =
    useState<IInitialVacinatelInfo>(initialVacinatelInfo);
  const cancelToken = cancelTokenSource();
  function cancelRequest() {
    cancelToken.cancel(msgRequestCanceled);
  }

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

  const getTheLatestNumber = async () => {
    setTheLatestLoading(true);
    try {
      const res = await hcsService.peopleLatestVaccinationOverview(
        {},
        {
          cancelToken: cancelToken.token,
        }
      );
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
    getTheLatestNumber();
    getNumberOf();
    return () => {
      cancelRequest();
      setNumberOf(initialVacinatelInfo);
      setThelatestNumberOf(initialVacinatelInfo);
    };
  }, []);

  return (
    <>
      <fieldset className="mb-16 rounded-xl border p-4 text-center">
        <legend className="mx-auto px-3 text-black">نگاه کلی به وضعیت واکسیناسیون کل کشور</legend>
        <OverviewVaccinationStatus loading={loading} numberOf={numberOf} />
      </fieldset>
      <fieldset className="mb-16 rounded-xl border p-4 text-center">
        <legend className="mx-auto px-3 text-black">نگاه کلی به درصد واکسیناسیون کل کشور</legend>
        <OverViewVaccinationPercentageStatus
          theLatestloading={theLatestloading}
          thelatestNumberOf={thelatestNumberOf}
          loading={loading}
          numberOf={numberOf}
        />
      </fieldset>
    </>
  );
};

export default OverviewVaccine;
