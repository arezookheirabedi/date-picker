import {useEffect, useState} from 'react';

// api services
import axios from "axios";
import bakeryService from '../../../services/bakery/custom/bakery.service';

export default function useOverviewOfAuditProvince() {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<any>([]);
  const [filteredDataset, setFilteredDataset] = useState<any>([]);
  const [error, setError] = useState(false);
  const [count, setCount] = useState<any>(0);
  const [provinceName, setProvinceName] = useState<any>();

  const {CancelToken} = axios;
  const source = CancelToken.source();

  // const overviewOfResults = async (from: any = null, to: any = null, province: any) => {
  const overviewOfResults = async (province : any) => {
    setLoading(true);
    setError(false);
    try {
        const { data } = await bakeryService.bakeryReport(
            { reportName: "inspectionNeedDetail" },
            { cancelToken: source.token }
        );
        // const {data} = await bakeryService.bakeryAudit({
        //   lang: 'fa',
        //   // from,
        //   // to,
        // });
      const normalizedData: any[] = [];
      data.forEach((item: any, index: number) => {
        // if (item.total !== 0) {
        normalizedData.push({
          id: `ovca_${index}`,
          province : item.province,
          city : item.city,
          simaId: item.simaId,
          nationalId: item.nationalId,
          inspectionNeedCount : "",
          address: item.address,
          flourQuota: item.flourQuota === "TRUE",
          isExtortion: item.isExtortion === "TRUE",
          workTime: item.workTime === "TRUE",
          bakeryWithoutTransaction: item.bakeryWithoutTransaction === "TRUE",
          unusualTransaction: item.UnusualTransaction === "TRUE"
        });
      });
      const sortData = normalizedData.filter(item => {
        return item.province.trim() === province
      })
      setCount(sortData.length)
      setList([...sortData]);
      setFilteredDataset([...sortData]);
    } catch (err: any) {
      setError(err.message || '')
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // overviewTestResults(query.resultReceiptDateFrom, query.resultReceiptDateTo);
    return () => {
      source.cancel('Operation canceled by the user.');
      setList([]);
    };
    
  }, []);

  useEffect(() => {
    setList([])
    overviewOfResults(provinceName);
  },[provinceName])
  
  return {
    loading,
    list,
    count,
    setCount,
    filteredDataset,
    setFilteredDataset,
    provinceName,
    setProvinceName,
    error
    };
}