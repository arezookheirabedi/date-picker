import React, {useState} from 'react';
import useGetTheLatestVaccinesInfo from 'src/hooks/apis/useGetTheLatestVaccinesInfo';
import LatestOverviewOfStatusCard from './LatestOverviewOfStatusCard';
import OverviewOfTheLatestPublicGuildVaccinationStatus from './OverviewOfTheLatestPublicGuildVaccinationStatus';

const TheLatestOverwiewOfVaccination: React.FC<{}> = () => {
  const [queryParams, setQueryParams] = useState({
    to: null,
    tag: 'guild',
    retry: false,
  });
  const {
    chartData,
    cartData,
    loading,
    error: errorMessage,
  } = useGetTheLatestVaccinesInfo(queryParams);

  return (
    <fieldset className="mb-16 rounded-xl border p-4 text-center">
      <legend className="mx-auto px-3 text-black">نگاه کلی به آخرین وضعیت واکسیناسیون اصناف</legend>

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
