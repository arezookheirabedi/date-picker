import {useState} from 'react';
import useGetOverviewOfArbaeenPilgrimAgeStatus from 'src/hooks/apis/useGetOverviewOfArbaeenPilgrimAgeStatus';
import OverviewPligrimAgeCount from './OverviewPligrimAgeCount';
import OverviewPligrimAgePercentage from './OverviewPligrimAgePercentage';

const OverviewPilgrimAge: React.FC<{}> = () => {
  const [query, setQuery] = useState({
    retry: false,
  });
  const {
    dataCount: datasetCount,
    dataPercentage: datasetPercentage,
    loading,
    error: errorMessage,
  } = useGetOverviewOfArbaeenPilgrimAgeStatus(query);
  return (
    <>
      <OverviewPligrimAgeCount
        dataset={datasetCount}
        loading={loading}
        errorMessage={errorMessage}
        setQuery={setQuery}
      />
      <OverviewPligrimAgePercentage
        setQuery={setQuery}
        dataset={datasetPercentage}
        loading={loading}
        errorMessage={errorMessage}
      />
    </>
  );
};
export default OverviewPilgrimAge;
