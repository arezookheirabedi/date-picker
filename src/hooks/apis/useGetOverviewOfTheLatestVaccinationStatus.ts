import {useEffect, useState} from "react";
import axios from "axios";
import {IInitialNumberOfDoses, initialNumberOfDoses} from "../../components/Passengers/public/constant";
import hcsService from "../../services/hcs.service";


export default function useGetOverviewOfTheLatestVaccinationStatus(query: any) {
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


  useEffect(() => {
    getIt(query);
    return () => {
      setData(initialNumberOfDoses);
      source.cancel('Operation canceled by the user.');
    };
  }, []);

  return {loading, error, data};
}