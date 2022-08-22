import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import inspectionService from '../../../services/inspection.service';
import {sideCities} from '../../../helpers/utils';
import {EERRORS} from "../../../constants/errors.enum";

export default function useGetOverviewInspectionStatus(hasProvince: boolean = false) {
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line
  const [error, setError] = useState<any>(false);
  const [data, setData] = useState<any>([]);

  const {CancelToken} = axios;
  const source = CancelToken.source();

  const getInspectionStatus = async (province: any = null) => {
    setLoading(true);
    try {
      const {data: result} = await inspectionService.inspectionStatus(
        {tag: 'transport', province},
        {cancelToken: source.token}
      );
      setData(result);
      setError(false);
      setLoading(false);
    } catch (err: any) {
      if (err.message === 'cancel') {
        setLoading(true);
        return;
      }
      setError(err.message || EERRORS.ERROR_500);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasProvince) return;
    getInspectionStatus();
    // eslint-disable-next-line consistent-return
    return () => {
      setData([]);
      source.cancel('Operation canceled by the user.');
    };
  }, []);

  const location = useLocation();

  useEffect(() => {
    if (!hasProvince) return;
    const params = new URLSearchParams(location.search);
    const provinceName = params.get('provinceName') || ('تهران' as any);
    const existsCity = sideCities.some((item: any) => {
      return item.name === provinceName;
    });
    if (existsCity) {
        getInspectionStatus(provinceName);
    }
    // eslint-disable-next-line consistent-return
    return () => {
      source.cancel('Operation canceled by the user.');
      setData([]);
    };
  }, [location.search]);

  return {loading, error, data};
}
