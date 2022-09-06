import axios from 'axios';
import {useEffect, useState} from 'react';
import useGetArbaeenCountDataOnRegisterTime from 'src/hooks/apis/useGetArbaeenCountDataOnRegisterTime';
import arbaeenService from 'src/services/arbaeen.service';
import {IInitialVaccineValue, initialVaccineValue} from '../constant';
import OverviewPilgrimVaccineStatus from './OverviewPilgrimVaccineStatus';
import OverviewPilgrimVaccineStatusPercentage from './OverviewPilgrimVaccineStatusPercentage';

const OverviewRegisterVaccinesInfo: React.FC<{}> = () => {
  const [loading, setLoading] = useState(false);
  const [pilgrims, setPilgrims] = useState<IInitialVaccineValue>(initialVaccineValue);
  const {CancelToken} = axios;
  const source = CancelToken.source();

  const {data: totalInfo, loading: loadingPositiveTest} = useGetArbaeenCountDataOnRegisterTime({
    countLastPositiveTestResultWhileRegistered: true,
  });
  const getAllPilgrims = async () => {
    setLoading(true);
    try {
      const {data} = await arbaeenService.getVaccineInfo({}, {cancelToken: source.token});

      setPilgrims({...data});
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPilgrims();
    return () => {
      setPilgrims({...initialVaccineValue});

      source.cancel('Operation canceled by the user.');
    };
  }, []);
  return (
    <>
      <OverviewPilgrimVaccineStatus
        loading={loading}
        pilgrims={pilgrims}
        totalInfo={totalInfo}
        loadingPositiveTest={loadingPositiveTest}
      />
      <OverviewPilgrimVaccineStatusPercentage
        loading={loading}
        pilgrims={pilgrims}
        totalInfo={totalInfo}
        loadingPositiveTest={loadingPositiveTest}
      />
    </>
  );
};
export default OverviewRegisterVaccinesInfo;
