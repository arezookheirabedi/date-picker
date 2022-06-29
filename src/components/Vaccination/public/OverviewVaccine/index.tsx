/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import useGetNumberOf from 'src/hooks/apis/useGetNumberOf';
import useGetTheLatestVaccinesInfo from 'src/hooks/apis/useGetTheLatestVaccinesInfo';
import OverViewVaccinationPercentageStatus from './OverviewVaccinePercentage';
import OverviewVaccinationStatus from './OverviewVaccineCount';

const OverviewVaccine: React.FC<{}> = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {data: numberOf, loading, error} = useGetNumberOf();

  const {
    cartData: thelatestNumberOf,
    loading: theLatestloading,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    error: errorMessage,
  } = useGetTheLatestVaccinesInfo();

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
