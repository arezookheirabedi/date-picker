import React, {useEffect, useState} from 'react';
import {cancelTokenSource, msgRequestCanceled, sideCities} from 'src/helpers/utils';
import hcsService from 'src/services/hcs.service';
import {useHistory, useLocation} from 'react-router-dom';
import LatestOverviewOfStatusCard from './LatestOverviewOfStatusCard';
import OverviewOfTheLatestPublicSchoolVaccinationStatus from './OverviewOfTheLatestPublicSchollVaccinationStatus';
import {IInitialNumberOfDoses, initialNumberOfDoses} from '../../../Guild/public/constant';

interface OverviewCategoriesProvinceProps {
  cityTitle?: any;
}

const TheLatestOverwiewOfVaccination: React.FC<OverviewCategoriesProvinceProps> = ({cityTitle}) => {
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
      setErrorMessage(error.message || 'موردی برای نمایش وجود ندارد.');

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
      getGuildVaccinateInfo({...queryParams, tag: 'edu'});
    } else {
      history.push('/dashboard/school/province');
    }

    return () => {
      if (existsCity) {
        setNumberOf(initialNumberOfDoses);
        cancelRequest();
      }
    };
  }, [location.search, queryParams]);

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">
        {' '}
        نگاه کلی به آخرین وضعیت واکسیناسیون آموزش و پرورش در استان {cityTitle}
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
