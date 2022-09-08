import axios from 'axios';
import {useEffect, useState} from 'react';
import useGetArbaeenCountDataOnRegisterTime from 'src/hooks/apis/useGetArbaeenCountDataOnRegisterTime';
import arbaeenService from 'src/services/arbaeen.service';
import {IInitialVaccineValue, initialVaccineValue} from '../constant';
import TheLatestOverviewPilgrimVaccineStatus from './TheLatestOverviewPilgrimVaccineStatus';
import TheLatestOverviewPilgrimVaccineStatusPercentage from './TheLatestOverviewPilgrimVaccineStatusPercentage';

const OverviewLatestVaccinesInfo: React.FC<{}> = () => {
  const [loading, setLoading] = useState(false);
  const [pilgrims, setPilgrims] = useState<IInitialVaccineValue>(initialVaccineValue);
  const {CancelToken} = axios;
  const source = CancelToken.source();

  const {data: totalInfo, loading: loadingPositiveTest} = useGetArbaeenCountDataOnRegisterTime({
    countLastPositiveTestResult: true,
  });
  const getAllPilgrims = async () => {
    setLoading(true);
    try {
      const {data} = await arbaeenService.getTheLatestVaccineInfo({}, {cancelToken: source.token});

      setPilgrims({...data});
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInterval(() => {
      getAllPilgrims();
    },(60000 * 5))
    getAllPilgrims();
    return () => {
      setPilgrims({...initialVaccineValue});

      source.cancel('Operation canceled by the user.');
    };
  }, []);
  return (
    <>
      <TheLatestOverviewPilgrimVaccineStatus
        loading={loading}
        pilgrims={pilgrims}
        totalInfo={totalInfo}
        loadingPositiveTest={loadingPositiveTest}
      />
      <TheLatestOverviewPilgrimVaccineStatusPercentage
        loading={loading}
        pilgrims={pilgrims}
        totalInfo={totalInfo}
        loadingPositiveTest={loadingPositiveTest}
      />
    </>
  );
};
export default OverviewLatestVaccinesInfo;
