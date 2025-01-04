import React, {useState} from 'react';
import useGetTheLatestVaccinesInfo from 'src/hooks/apis/useGetTheLatestVaccinesInfo';
import LatestOverviewOfStatusCard from './LatestOverviewOfStatusCard';
import OverviewOfTheLatestPublicSchoolVaccinationStatus from './OverviewOfTheLatestPublicSchollVaccinationStatus';

interface OverviewCategoriesProvinceProps {
  cityTitle?: any;
}

const TheLatestOverwiewOfVaccination: React.FC<OverviewCategoriesProvinceProps> = ({cityTitle}) => {
  const [queryParams, setQueryParams] = useState({
    to: null,
    tag: 'edu',
    retry: false,
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
        نگاه کلی به آخرین وضعیت واکسیناسیون آموزش و پرورش در استان {cityTitle}
      </legend>

      <LatestOverviewOfStatusCard numberOf={cartData}  loading={false}/>

      <OverviewOfTheLatestPublicSchoolVaccinationStatus
       loading={false}
        numberOf={chartData}
        setQueryParams={setQueryParams}
        queryParams={queryParams}
        errorMessage={errorMessage}
      />
    </fieldset>
  );
};

export default TheLatestOverwiewOfVaccination;
