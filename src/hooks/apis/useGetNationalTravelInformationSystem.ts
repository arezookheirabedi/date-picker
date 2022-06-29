import {useEffect, useState} from "react";
import {useHistory, useLocation} from "react-router-dom";
import axios from "axios";
import transportService from "../../services/transport.service";
import {sideCities} from "../../helpers/utils";
import {initialVacinatelInfo} from "./useGetNumberOf";

export default function useGetNationalTravelInformationSystem(hasProvince: boolean = false) {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<any>({
    healthStatusCalls: null
  });

  const {CancelToken} = axios;
  const source = CancelToken.source();

  const getIt = async (param: any = null) => {
    setLoading(true);
    setError(false);
    try {
      const {data: result} = await transportService.getSamasInfo(param, {cancelToken: source.token});
      setData(result);
    } catch (err) {
      // eslint-disable-next-line
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasProvince) {
      return;
    }
    getIt();
    // eslint-disable-next-line consistent-return
    return () => {
      setData({
        healthStatusCalls: null
      });
      source.cancel('Operation canceled by the user.');
    };
  }, []);

  const location = useLocation();
  const history = useHistory();

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
      getIt({'province': provinceName});
    } else {
      history.push('/dashboard/health/transport/province');
    }
    // eslint-disable-next-line consistent-return
    return () => {
      setData(initialVacinatelInfo);
      source.cancel('Operation canceled by the user.');
    };
  }, [location.search]);

  return {loading, error, data};
}