import React, {useState} from 'react';
import useGetTheLatestVaccinesInfo from 'src/hooks/apis/useGetTheLatestVaccinesInfo';
import LatestOverviewOfStatusCard from './LatestOverviewOfStatusCard';
import OverviewOfTheLatestPublicGuildVaccinationStatus from './OverviewOfTheLatestPublicGuildVaccinationStatus';

interface ITheLatestOverwiewOfVaccination {
  cityTitle?: any;
}
const TheLatestOverwiewOfVaccination: React.FC<ITheLatestOverwiewOfVaccination> = ({cityTitle}) => {
  const [queryParams, setQueryParams] = useState({
    to: null,
    tag: 'guild',
  });
  const {
    chartData,
    cartData,
    loading,
    error: errorMessage,
  } = useGetTheLatestVaccinesInfo(queryParams, true);
  return (
    <fieldset className="mb-16 rounded-xl border p-4 text-center">
      <legend className="mx-auto px-3 text-black">
        {' '}
        نگاه کلی به آخرین وضعیت واکسیناسیون اصناف استان {cityTitle}
      </legend>

      <LatestOverviewOfStatusCard loading={loading} numberOf={cartData} />

      <OverviewOfTheLatestPublicGuildVaccinationStatus
        loading={loading}
        numberOf={chartData}
        setQueryParams={setQueryParams}
        queryParams={queryParams}
        errorMessage={errorMessage}
      />
    </fieldset>
  );
};

export default TheLatestOverwiewOfVaccination;
