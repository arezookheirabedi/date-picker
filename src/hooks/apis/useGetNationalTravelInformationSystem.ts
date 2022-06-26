import {useEffect, useState} from "react";
import axios from "axios";
import transportService from "../../services/transport.service";

export default function useGetNationalTravelInformationSystem() {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<any>({
    healthStatusCalls: null
  });

  const {CancelToken} = axios;
  const source = CancelToken.source();

  const getIt = async () => {
    setLoading(true);
    setError(false);
    try {
      const {data: result} = await transportService.getSamasInfo(null, {cancelToken: source.token});
      setData(result);
    } catch (err) {
      // eslint-disable-next-line
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getIt();
    return () => {
      setData({
        healthStatusCalls: null
      });
      source.cancel('Operation canceled by the user.');
    };
  }, []);

  return {loading, error, data};
}