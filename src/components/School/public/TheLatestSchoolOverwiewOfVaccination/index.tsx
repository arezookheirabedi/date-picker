import React, {useEffect, useState} from 'react';
import {cancelTokenSource, msgRequestCanceled} from 'src/helpers/utils';
import hcsService from 'src/services/hcs.service';
import LatestOverviewOfStatusCard from './LatestOverviewOfStatusCard';
import OverviewOfTheLatestPublicSchoolVaccinationStatus from './OverviewOfTheLatestPublicSchollVaccinationStatus';
import {IInitialNumberOfDoses, initialNumberOfDoses} from '../../../Guild/public/constant';

const TheLatestOverwiewOfVaccination: React.FC<{}> = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [queryParams, setQueryParams] = useState({
    from: null,
    to: null,
  });
  const [numberOf, setNumberOf] = useState<IInitialNumberOfDoses>(initialNumberOfDoses);

  const cancelToken = cancelTokenSource();

  function cancelRequest() {
    cancelToken.cancel(msgRequestCanceled);
  }

  const getGuildVaccinateInfo = async (params: any) => {
    setErrorMessage(null);
    setLoading(true);
    try {
      const res = await hcsService.peopleLatestVaccinationOverview(params, {
        cancelToken: cancelToken.token,
      });
      const newData = {...initialNumberOfDoses, ...res.data};
      setNumberOf(newData);
    } catch (error: any) {
      setErrorMessage(error.message || 'موردی برای نمایش وجود ندارد.');

      // eslint-disable-next-line
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getGuildVaccinateInfo({...queryParams, tag: 'edu'});
    return () => {
      cancelRequest();
      setNumberOf(initialNumberOfDoses);
    };
  }, [queryParams]);

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">
        {' '}
        نگاه کلی به آخرین وضعیت واکسیناسیون آموزش و پرورش
      </legend>

      <LatestOverviewOfStatusCard loading={loading} numberOf={numberOf} />

      <OverviewOfTheLatestPublicSchoolVaccinationStatus
        loading={loading}
        numberOf={numberOf}
        setQueryParams={setQueryParams}
        queryParams={queryParams}
        errorMessage={errorMessage}
      />
    </fieldset>
  );
};

export default TheLatestOverwiewOfVaccination;
