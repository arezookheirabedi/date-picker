import {useState} from 'react';
import useGetOverviewOfArbaeenPilgrimExistAbroad from 'src/hooks/apis/useGetOverviewOfArbaeenPilgrimExistAbroad';
import OverviewOfExistBordersCount from './OverviewOfExistBordersCount';
import OverviewOfExistBordersPercentage from './OverviewOfExistBordersPercentage';

const OverviewOfExistBorder: React.FC<{}> = () => {
  const [query, setQuery] = useState({
    retry: false,
  });
  const {
    dataCount: datasetCount,
    dataPercentage: datasetPercentage,
    loading,
    error: errorMessage,
  } = useGetOverviewOfArbaeenPilgrimExistAbroad(query);
  return (
    <>
      {' '}
      <OverviewOfExistBordersCount
        dataset={datasetCount}
        loading={loading}
        errorMessage={errorMessage}
        setQuery={setQuery}
      />
      <OverviewOfExistBordersPercentage
        setQuery={setQuery}
        dataset={datasetPercentage}
        loading={loading}
        errorMessage={errorMessage}
      />
    </>
  );
};
export default OverviewOfExistBorder;
