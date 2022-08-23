import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
// api services
import axios from "axios";
import inspectionService from '../../../services/inspection.service';
import {sideCities} from '../../../helpers/utils';
import {EERRORS} from "../../../constants/errors.enum";

export default function useGetOverviewListOfInspections(hasProvince : boolean = false) {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<any>([]);
  const [filteredDataset, setFilteredDataset] = useState<any>([]);
  const [error, setError] = useState(false);
  const [count, setCount] = useState<any>(0);
  
  const {CancelToken} = axios;
  const source = CancelToken.source();

  const getListOfInspections = async (province: any = null) => {
    setLoading(true);
    try {
        const {data} = await inspectionService.inspectionAll(
          {tag: 'transport', province},
          {cancelToken: source.token}
        );
        const normalizedData: any[] = [];
        data.forEach((item: any, index: number) => {
          normalizedData.push({
              id: `ovca_${index}`,
              ...item,
          });
        });
        setCount(normalizedData.length);
        setList([...normalizedData]);
        setFilteredDataset([...normalizedData]);
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
    getListOfInspections();
    // eslint-disable-next-line consistent-return
    return () => {
      setList([]);
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
      getListOfInspections(provinceName);
    }
    // eslint-disable-next-line consistent-return
    return () => {
      source.cancel('Operation canceled by the user.');
      setList([]);
    };
  }, [location.search]);

  return {
    loading,
    list,
    count,
    setCount,
    filteredDataset,
    setFilteredDataset,
    error
    };
}