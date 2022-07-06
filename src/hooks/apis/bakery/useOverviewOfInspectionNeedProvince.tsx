import {useEffect, useState} from 'react';

// api services
import axios from "axios";
import bakeryService from '../../../services/bakery/custom/bakery.service';

const initialNumber = {
    bakeryWithoutTransaction: 0,
    dailyTransactionAverage: 0,
    posActiveTime: 0,
    province: 'تهران',
    transactionAmout: 0,
    unsualTransaction: 0,
};

export default function useOverviewOfInspectionNeedProvince(city:any) {

  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<any>(initialNumber);
  const [error, setError] = useState(false);
  const [provinceName, setProvinceName] = useState<any>();

  const {CancelToken} = axios;
  const source = CancelToken.source();

  const getBakeries = async (province: any) => {
    setLoading(true);
    try {
        const {data} = await bakeryService.bakeryReport(
          {reportName: "inspectionNeedProvince", province},
          {cancelToken: source.token}
        );
      const result = data.find((x: any) => {
        return x.province === city
      })
      setList({...result});
    } catch (err: any) {
        setError(err.message || '')
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    
    return () => {
      source.cancel('Operation canceled by the user.');
    };

  }, []);

  useEffect(() => {
    setList([])
    getBakeries(provinceName);
  },[provinceName])

  return {
    loading,
    list,
    error,
    setProvinceName
    };
}