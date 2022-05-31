import React, {useEffect, useState} from 'react';
import {cancelTokenSource, msgRequestCanceled, sideCities} from 'src/helpers/utils';
import hcsService from 'src/services/hcs.service';
import {useHistory, useLocation} from 'react-router-dom';
import LatestOverviewOfStatusCard from './LatestOverviewOfStatusCard';
import OverviewOfTheLatestPublicGuildVaccinationStatus from './OverviewOfTheLatestPublicGuildVaccinationStatus';
import {IInitialNumberOfDoses, initialNumberOfDoses} from '../../public/constant';

interface ITheLatestOverwiewOfVaccination {
  cityTitle?: any;
}
const TheLatestOverwiewOfVaccination: React.FC<ITheLatestOverwiewOfVaccination> = ({cityTitle}) => {
  const location = useLocation();
  const history = useHistory();
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
      setErrorMessage(error.message || 'خطایی در عملیات');

      // eslint-disable-next-line
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
      getGuildVaccinateInfo({...queryParams, tag: 'guild', province: provinceName});
    } else {
      history.push('/dashboard/guild/province');
    }
    return () => {
      cancelRequest();
      setNumberOf(initialNumberOfDoses);
    };
  }, [queryParams, location.search]);

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">
        {' '}
        نگاه کلی به آخرین وضعیت واکسیناسیون اصناف استان {cityTitle}
      </legend>

      <LatestOverviewOfStatusCard loading={loading} numberOf={numberOf} />

      <OverviewOfTheLatestPublicGuildVaccinationStatus
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
