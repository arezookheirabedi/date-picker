import {useEffect, useState} from "react";
import {useHistory, useLocation} from "react-router-dom";
import axios from "axios";
import {IInitialNumberOfDoses, initialNumberOfDoses} from "../../components/Passengers/public/constant";
import hcsService from "../../services/hcs.service";
import {sideCities} from "../../helpers/utils";

export default function useGetOverviewOfTheLatestVaccinationStatus(query: any, hasProvince: boolean = false) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<IInitialNumberOfDoses>(initialNumberOfDoses);

  const {CancelToken} = axios;
  const source = CancelToken.source();

  const getIt = async (params: any) => {
    setLoading(true);
    try {
      const res = await hcsService.getPeopleVaccine(
        params,
        {cancelToken: source.token}
      );
      if (res.status === 200) {
        const newData = {...initialNumberOfDoses, ...res.data};
        setData(newData);
      }
    } catch (err: any) {
      // eslint-disable-next-line
      console.log(err);
      setError(err.message || '')
    } finally {
      setLoading(false);
    }
  };

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (hasProvince) {
      return;
    }

    getIt(query);
    // eslint-disable-next-line consistent-return
    return () => {
      setData(initialNumberOfDoses);
      source.cancel('Operation canceled by the user.');
    };
  }, []);

  useEffect(() => {
    if (!hasProvince) {
      return;
    }
    const params = new URLSearchParams(location.search);
    const provinceName = params.get('provinceName') || ('تهران' as any);
    const existsCity = sideCities.some((item: any) => {
      return item.name === provinceName;
    });
    if (existsCity) {
      getIt({...query, 'province': provinceName});

    } else {
      history.push('/dashboard/health/transport/province');
    }
    // getPcrResult();
    // eslint-disable-next-line consistent-return
    return () => {
      setData(initialNumberOfDoses);
      source.cancel('Operation canceled by the user.');
      // setGuildPcrInfo(initialPcrInfo);
    };
  }, [location.search]);

  return {loading, error, data};
}