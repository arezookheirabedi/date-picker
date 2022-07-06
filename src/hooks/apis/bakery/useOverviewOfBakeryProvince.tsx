import {useEffect, useState} from 'react';

// api services
import axios from "axios";
import bakeryService from '../../../services/bakery/custom/bakery.service';

const initialNumber = {
    ProvinceCode: 0,
    bakeryWithoutTransaction: 0,
    dailyTransactionAverage: 0,
    numberOfActivePos: 0,
    numberOfBakeryWithoutPos: 0,
    numberOfBakeryWithtPos: 0,
    numberOfDeadOwnerBakery: 0,
    numberOfDisableBakery: 0,
    numberOfDoneInspections: 0,
    numberOfEnableBakery: 0,
    numberOfInspectionNeed: 0,
    numberOfRegisterPos: 0,
    numberOfSamt: 0,
    numberOfShareFlour: 0,
    numberOfTotalBakery: 0,
    posActiveTime: 0,
    province: "تهران",
    transactionAmout: 0,
    unsualTransaction: 0,
    numberOfConformityGuildCode : 0,
    numberOfNonConformityGuildCode: 0,
    numberOfGuildCodeDoesNotExit : 0
  };

export default function useOverviewOfBakeryProvince(city:any) {
    
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<any>(initialNumber);
  const [error, setError] = useState(false);
  const [count, setCount] = useState<any>(0);
  const [provinceName, setProvinceName] = useState<any>();

  const {CancelToken} = axios;
  const source = CancelToken.source();

  // get count of inspections
  const getCount = async () => {
    setLoading(true);
    setError(false)
    try {
      const {data} = await bakeryService.bakeryCount(
        {tag: 'transparent'},
        {cancelToken: source.token}
      );
      setCount(data)
    } catch (err: any) {
        setError(err.message || '')
    } finally {
      setLoading(false);
    }
  }

  const getBakeries = async (province: any) => {
    setLoading(true);
    try {
      const {data} = await bakeryService.bakeryReport(
        {reportName: "generalProvince", province},
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
    getCount()
  },[provinceName])

  return {
    loading,
    list,
    count,
    error,
    setProvinceName
    };
}